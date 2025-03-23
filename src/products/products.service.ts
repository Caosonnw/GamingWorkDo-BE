import { CreateProductWithVariantsDto } from '@/products/dto/create-product.dto'
import { newDate } from '@/utils/helper'
import { Response } from '@/utils/utils'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaClient) {}

  async getAllProducts() {
    try {
      const data = await this.prisma.products.findMany({
        include: {
          categories: {
            select: {
              category_id: true,
              category_name: true
            }
          },
          brands: {
            select: {
              brand_id: true,
              brand_name: true
            }
          },
          product_variants: {
            select: {
              variant_id: true,
              product_id: true,
              variant_name: true,
              variant_price: true,
              product_image_main: true,
              product_image_hover: true,
              product_status: true,
              rating: true,
              attributes: true,
              update_at: true,
              created_at: true
            }
          }
        }
      })
      if (!data || data.length === 0) {
        return Response('No products found', HttpStatus.NOT_FOUND)
      } else {
        return Response('Get the product list successfully', HttpStatus.OK, data)
      }
    } catch (error) {
      console.log(error)
      throw new HttpException('An error occurred during the process', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async getProductById() {}

  async createProductWithVariants() {}

  async getProductPagination() {}

  async updateProduct() {}

  async deleteProduct() {}
}
