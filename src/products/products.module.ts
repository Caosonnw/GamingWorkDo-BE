import { Module } from '@nestjs/common'
import { ProductsService } from './products.service'
import { ProductsController } from './products.controller'
import { PrismaClient } from '@prisma/client'
import { JwtService } from '@nestjs/jwt'

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, PrismaClient, JwtService]
})
export class ProductsModule {}
