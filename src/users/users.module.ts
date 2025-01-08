import { Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { UsersController } from './users.controller'
import { PrismaClient } from '@prisma/client'
import { JwtService } from '@nestjs/jwt'

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaClient, JwtService]
})
export class UsersModule {}
