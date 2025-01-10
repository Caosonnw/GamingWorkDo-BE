import { ResponseInterceptor } from '@/common/interceptors/response.interceptor'
import { CreateProductWithVariantsDto } from '@/products/dto/create-product.dto'
import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UseInterceptors } from '@nestjs/common'
import { ApiParam, ApiTags } from '@nestjs/swagger'
import { ProductsService } from './products.service'

@ApiTags('Products')
@UseInterceptors(ResponseInterceptor)
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('/get-all-products')
  async getAllProducts() {
    return await this.productsService.getAllProducts()
  }

  @Get('get-product-pagination/:page/:limit')
  async getProductPagination() {
    return await this.productsService.getProductPagination()
  }

  @Get('get-product-by-id/:product_id')
  @ApiParam({ name: 'product_id', description: 'Product ID' })
  async getProductById(@Param('product_id') product_id) {
    return await this.productsService.getProductById(product_id)
  }

  @Post('create-product')
  async createProduct(@Body() data: CreateProductWithVariantsDto) {
    return this.productsService.createProductWithVariants(data)
  }

  @Put('update-product/:product_id')
  @ApiParam({ name: 'product_id', description: 'Product ID' })
  async updateProduct() {}

  @Delete('delete-product/:product_id')
  @ApiParam({ name: 'product_id', description: 'Product ID' })
  async deleteProduct() {}
}
