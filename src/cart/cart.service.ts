import { Response } from '@/utils/utils'
import { HttpStatus, Injectable } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

@Injectable()
export class CartService {
  constructor(private prisma: PrismaClient) {}

  async getCartByUserId(user_id: number) {
    const data = await this.prisma.cart.findMany({
      where: {
        user_id: user_id
      },
      include: {
        users: {
          select: {
            user_id: true,
            full_name: true,
            email: true,
            phone_number: true,
            date_of_birth: true,
            role: true
          }
        },
        product_variants: true
      }
    })
    if (!data || data.length === 0) {
      return Response('Cart is empty', HttpStatus.NOT_FOUND)
    }
    return Response('Get the cart list successfully', HttpStatus.OK, data)
  }

  async addProductToCart(user_id: number, product_variant_id: number, quantity: number) {
    const product_variant = await this.prisma.product_variants.findMany({
      where: {
        variant_id: product_variant_id
      }
    })
    if (!product_variant || product_variant.length === 0) {
      return Response('Product variant not found', HttpStatus.NOT_FOUND)
    }
    const checkQuantity = await this.prisma.cart.findMany({
      where: {
        user_id: user_id,
        variant_id: product_variant_id,
        quantity: quantity
      }
    })
    if (checkQuantity.length === 0) {
      try {
        const data = await this.prisma.cart.create({
          data: {
            user_id: user_id,
            variant_id: product_variant_id,
            quantity: quantity
          }
        })

        return Response('Add product to cart successfully', HttpStatus.CREATED)
      } catch (error) {
        return Response('Failed to add product to cart', HttpStatus.INTERNAL_SERVER_ERROR)
      }
    } else {
      try {
        await this.prisma.cart.updateMany({
          where: {
            user_id: user_id,
            variant_id: product_variant_id,
            quantity: quantity
          },
          data: {
            quantity: {
              increment: quantity
            }
          }
        })
        return Response('Update product quantity in cart successfully', HttpStatus.OK)
      } catch (error) {
        return Response('Failed to update product quantity in cart', HttpStatus.INTERNAL_SERVER_ERROR)
      }
    }
  }

  async deleteProductFromCart(user_id: number, product_variant_id: number, quantity: number) {
    const product_variant = await this.prisma.product_variants.findMany({
      where: {
        variant_id: product_variant_id
      }
    })
    if (!product_variant) {
      return Response('Product variant not found', HttpStatus.NOT_FOUND)
    }
    const checkCartItem = await this.prisma.cart.findMany({
      where: {
        user_id: user_id,
        variant_id: product_variant_id
      }
    })
    if (!checkCartItem || checkCartItem.length === 0) {
      return Response('Product not found in cart', HttpStatus.NOT_FOUND)
    }
    if (quantity <= 1) {
      try {
        const quantityInDB = await this.prisma.cart.findMany({
          where: {
            user_id: user_id,
            variant_id: product_variant_id
          }
        })
        await this.prisma.cart.updateMany({
          where: {
            user_id: user_id,
            variant_id: product_variant_id
          },
          data: {
            quantity: quantityInDB[0].quantity - quantity
          }
        })
        return Response('Update product quantity in cart successfully', HttpStatus.OK)
      } catch (error) {
        return Response('Failed to update product quantity in cart', HttpStatus.INTERNAL_SERVER_ERROR)
      }
    } else {
      try {
        await this.prisma.cart.deleteMany({
          where: {
            user_id: user_id,
            variant_id: product_variant_id
          }
        })
        return Response('Delete product from cart successfully', HttpStatus.OK)
      } catch (error) {
        return Response('Failed to delete product from cart', HttpStatus.INTERNAL_SERVER_ERROR)
      }
    }
  }
}
