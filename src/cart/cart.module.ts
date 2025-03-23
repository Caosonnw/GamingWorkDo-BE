import { Module } from '@nestjs/common'
import { CartService } from './cart.service'
import { CartController } from './cart.controller'
import { PrismaClient } from '@prisma/client'
import { JwtService } from '@nestjs/jwt'

@Module({
  controllers: [CartController],
  providers: [CartService, PrismaClient, JwtService]
})
export class CartModule {}
