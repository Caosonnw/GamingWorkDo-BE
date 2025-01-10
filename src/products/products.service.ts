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
              category_name: true,
              description: true
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
              variant_name: true,
              variant_price: true,
              product_image: true,
              stock: true,
              attributes: true,
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
      throw new HttpException('An error occurred during the process', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async getProductPagination() {}

  async getProductById(product_id) {
    try {
      const data = await this.prisma.products.findUnique({
        where: {
          product_id: parseInt(product_id)
        },
        include: {
          categories: {
            select: {
              category_id: true,
              category_name: true,
              description: true
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
              variant_name: true,
              variant_price: true,
              product_image: true,
              stock: true,
              attributes: true,
              created_at: true
            }
          }
        }
      })
      if (!data) {
        return Response('Product not found', HttpStatus.NOT_FOUND)
      } else {
        return Response('Get the product successfully', HttpStatus.OK, data)
      }
    } catch (error) {
      throw new HttpException('An error occurred during the process', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async createProductWithVariants(data: CreateProductWithVariantsDto) {
    return this.prisma.$transaction(async (prisma) => {
      // Tạo product
      const product = await prisma.products.create({
        data: {
          product_name: data.product_name,
          description: data.description,
          category_id: data.category_id,
          brand_id: data.brand_id,
          product_status: data.product_status,
          created_at: newDate(),
          update_at: newDate()
        }
      })

      // Tạo các variants liên quan
      if (data.variants && data.variants.length > 0) {
        const variantsData = data.variants.map((variant) => ({
          ...variant,
          product_id: product.product_id,
          created_at: newDate()
        }))

        await prisma.product_variants.createMany({
          data: variantsData
        })
      }

      return Response('Create product successfully', HttpStatus.CREATED, product)
    })
  }

  async updateProduct() {}

  async deleteProduct() {}
}
