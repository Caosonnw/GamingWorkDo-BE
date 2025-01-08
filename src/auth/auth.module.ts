import { JwtStrategy } from '@/auth/guards/strategies/jwt.strategy'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { PrismaClient } from '@prisma/client'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { RolesGuard } from '@/auth/guards/roles/roles.guard'
import { JwtAuthGuard } from '@/auth/guards/ jwt-auth.guard'

@Module({
  imports: [
    ConfigModule.forRoot(),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, PrismaClient, JwtStrategy, JwtAuthGuard, RolesGuard]
})
export class AuthModule {}
