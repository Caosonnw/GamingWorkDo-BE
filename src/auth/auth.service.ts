import { LoginUserDto } from '@/auth/auth-dto/login-user.dto'
import { RegisterUserDto } from '@/auth/auth-dto/register-user-dto'
import { Response } from '@/utils/utils'
import { HttpException, HttpStatus, Injectable, OnModuleInit } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService implements OnModuleInit {
  constructor(
    private readonly jwtService: JwtService,
    private prisma: PrismaClient,
    private readonly configService: ConfigService
  ) {}

  async onModuleInit() {
    await this.createInitialOwner()
  }

  // Tạo tài khoản Owner
  private async createInitialOwner() {
    const email = process.env.INITIAL_EMAIL_OWNER
    const password = process.env.INITIAL_PASSWORD_OWNER

    if (!email || !password) {
      console.warn('INITIAL_EMAIL_OWNER or INITIAL_PASSWORD_OWNER is not set in the .env file.')
      return
    }

    const existingOwner = await this.prisma.users.findFirst({
      where: { email, role: 'OWNER' }
    })

    if (!existingOwner) {
      const hashedPassword = bcrypt.hashSync(password, 10)

      await this.prisma.users.create({
        data: {
          full_name: 'Owner',
          email,
          password: hashedPassword,
          gender: true,
          date_of_birth: null,
          phone_number: null,
          role: 'OWNER',
          refresh_token: ''
        }
      })
      console.log(`Owner account created with email: ${email}`)
    } else {
      console.log(`Owner account already exists with email: ${email}`)
    }
  }

  generateRandomString = (length) => {
    let result = ''
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const charactersLength = characters.length
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
  }

  async register(RegisterUserDto: RegisterUserDto) {
    const { full_name, email, password, gender, date_of_birth, phone_number } = RegisterUserDto
    try {
      const user = await this.prisma.users.findFirst({
        where: { email: email }
      })
      if (user) {
        throw new HttpException('User already exists', HttpStatus.BAD_REQUEST)
      }
      const hashedPassword = bcrypt.hashSync(password, 10)
      const formattedDateOfBirth = date_of_birth ? new Date(date_of_birth).toISOString() : null
      let newData = {
        full_name,
        email,
        password: hashedPassword,
        gender: true,
        date_of_birth: formattedDateOfBirth,
        phone_number,
        role: 'USER',
        refresh_token: ''
      }

      await this.prisma.users.create({
        // data: newData
      })
      return {
        message: 'Sign up successfully!',
        status: HttpStatus.CREATED,
        date: new Date()
      }
    } catch (error) {
      console.log(error)
      if (error instanceof HttpException) {
        throw error
      }
      throw new HttpException('An error occurred during the sign-up process', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async login(loginUserDto: LoginUserDto, res) {
    const { email, password } = loginUserDto

    try {
      const user = await this.prisma.users.findFirst({
        where: { email: email }
      })

      if (!user) {
        throw new HttpException('Email is not found!', HttpStatus.NOT_FOUND)
      }

      if (!bcrypt.compareSync(password, user.password)) {
        throw new HttpException('Password is incorrect!', HttpStatus.BAD_REQUEST)
      }

      const key = this.generateRandomString(6)
      const payload = { user_id: user.user_id, role: user.role, key }

      const accessToken = this.jwtService.sign(payload, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
        algorithm: 'HS256',
        secret: process.env.JWT_SECRET
      })

      const refreshToken = this.jwtService.sign(
        { user_id: user.user_id, role: user.role, key },
        {
          expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
          algorithm: 'HS256',
          secret: process.env.JWT_SECRET_REFRESH
        }
      )

      user.refresh_token = refreshToken

      await this.prisma.users.update({
        data: user,
        where: { user_id: user.user_id }
      })

      // Set cookies
      res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: false,
        maxAge: parseInt(this.configService.get<string>('ACCESS_TOKEN_EXPIRES_IN'), 10),
        sameSite: 'lax',
        path: '/'
      })

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: false,
        maxAge: parseInt(this.configService.get<string>('REFRESH_TOKEN_EXPIRES_IN'), 10),
        sameSite: 'lax',
        path: '/'
      })

      return Response(accessToken, 'Login successfully!', HttpStatus.OK)
    } catch (error) {
      if (error instanceof HttpException) {
        throw error
      }
      throw new HttpException('An error occurred during the login process', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async createToken(token: string) {
    let decoded = await this.jwtService.decode(token)

    const getUser = await this.prisma.users.findFirst({
      where: { user_id: decoded.user_id }
    })

    if (!getUser) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED)
    }

    const tokenRef = this.jwtService.decode(getUser.refresh_token)

    if (!tokenRef || !tokenRef.key) {
      throw new HttpException('Invalid token data', HttpStatus.UNAUTHORIZED)
    }

    const isValidRefreshToken = await this.jwtService.verifyAsync(getUser.refresh_token, {
      secret: process.env.JWT_SECRET_REFRESH
    })

    if (!isValidRefreshToken) {
      throw new HttpException('Not Authorized', HttpStatus.UNAUTHORIZED)
    }

    // Create a new token
    const payload = {
      user_id: getUser.user_id,
      key: tokenRef.key
    }

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
      algorithm: 'HS256',
      secret: process.env.JWT_SECRET
    })

    return accessToken
  }

  async refreshToken(token: string, res) {
    try {
      const isValidRefreshToken = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET_REFRESH
      })

      if (!isValidRefreshToken) {
        throw new HttpException('Invalid refresh token', HttpStatus.UNAUTHORIZED)
      }

      const decoded = (await this.jwtService.decode(token)) as any

      const user = await this.prisma.users.findFirst({
        where: { user_id: decoded.user_id }
      })

      if (!user || user.refresh_token !== token) {
        throw new HttpException('Invalid user or refresh token', HttpStatus.UNAUTHORIZED)
      }

      // Tạo mới access token
      const payload = {
        user_id: user.user_id,
        role: user.role,
        key: decoded.key
      }

      const accessToken = this.jwtService.sign(payload, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
        secret: process.env.JWT_SECRET
      })

      const refreshToken = this.jwtService.sign(payload, {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
        secret: process.env.JWT_SECRET_REFRESH
      })

      // Cập nhật refresh token mới vào database
      await this.prisma.users.update({
        where: { user_id: user.user_id },
        data: { refresh_token: refreshToken }
      })

      // Set lại cookie
      res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: false, // Bật khi dùng HTTPS
        maxAge: parseInt(process.env.ACCESS_TOKEN_EXPIRES_IN, 10),
        sameSite: 'lax'
      })

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: false,
        maxAge: parseInt(process.env.REFRESH_TOKEN_EXPIRES_IN, 10),
        sameSite: 'lax'
      })

      return {
        message: 'Token refreshed',
        status: HttpStatus.OK,
        date: new Date()
      }
    } catch (error) {
      console.error('Error during refresh token process:', error)

      if (error instanceof HttpException) {
        throw error
      }

      throw new HttpException('An error occurred while refreshing token', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
