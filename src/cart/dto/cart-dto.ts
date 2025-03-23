import { ApiProperty } from '@nestjs/swagger'

export class AddProductToCartDTO {
  @ApiProperty()
  user_id: number

  @ApiProperty()
  product_variant_id: number

  @ApiProperty()
  quantity: number
}
