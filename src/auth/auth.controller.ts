import { LoginUserDto } from '@/auth/auth-dto/login-user.dto'
import { RegisterUserDto } from '@/auth/auth-dto/register-user-dto'
import { ResponseInterceptor } from '@/common/interceptors/response.interceptor'
import { Body, Controller, Headers, HttpException, HttpStatus, Post, Res, UseInterceptors } from '@nestjs/common'
import { ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger'
import { AuthService } from './auth.service'

@ApiTags('Auth')
@UseInterceptors(ResponseInterceptor)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() RegisterUserDto: RegisterUserDto) {
    return this.authService.register(RegisterUserDto)
  }

  @Post('login')
  login(@Body() LoginUserDto: LoginUserDto, @Res({ passthrough: true }) res) {
    return this.authService.login(LoginUserDto, res)
  }

  @ApiExcludeEndpoint()
  @Post('refresh-token')
  async refreshToken(@Body() refreshToken, @Res({ passthrough: true }) res) {
    return await this.authService.refreshToken(refreshToken.refreshToken, res)
  }
}
