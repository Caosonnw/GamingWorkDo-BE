import { Body, Controller, Delete, Get, Param, Put } from '@nestjs/common'
import { CartService } from './cart.service'
import { ApiTags } from '@nestjs/swagger'
import { AddProductToCartDTO } from '@/cart/dto/cart-dto'

@ApiTags('Cart')
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get('/get-cart-by-user-id/:user_id')
  async getCartByUserId(@Param('user_id') user_id: string) {
    return await this.cartService.getCartByUserId(parseInt(user_id))
  }

  @Put('/add-product-to-cart')
  async addProductToCart(@Body() body: AddProductToCartDTO) {
    const { user_id, product_variant_id, quantity } = body
    return await this.cartService.addProductToCart(user_id, product_variant_id, quantity)
  }

  @Delete('/delete-product-from-cart/:user_id/:product_variant_id/:quantity')
  async deleteProductFromCart(
    @Param('user_id') user_id: string,
    @Param('product_variant_id') product_variant_id: string,
    @Param('quantity') quantity: string
  ) {
    return await this.cartService.deleteProductFromCart(
      parseInt(user_id),
      parseInt(product_variant_id),
      parseInt(quantity)
    )
  }
}
