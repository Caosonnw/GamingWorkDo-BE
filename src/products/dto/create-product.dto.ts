import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsOptional, IsInt, IsArray, ValidateNested, IsNumber, IsBoolean, IsJSON } from 'class-validator'
import { Type } from 'class-transformer'

class CreateProductVariantDto {
  @ApiProperty({ example: 'Variant 1A', description: 'Tên biến thể sản phẩm' })
  @IsString()
  variant_name: string

  @ApiProperty({ example: 100, description: 'Giá của biến thể sản phẩm' })
  @IsNumber()
  variant_price: number

  @ApiProperty({ example: 'image1a.png', description: 'Đường dẫn ảnh của biến thể', required: false })
  @IsOptional()
  @IsString()
  product_image?: string

  @ApiProperty({ example: true, description: 'Trạng thái còn hàng (true/false)' })
  @IsBoolean()
  stock: boolean

  @ApiProperty({
    example: { size: 'M', color: 'red' },
    description: 'Thuộc tính JSON của biến thể (kích thước, màu sắc, v.v.)',
    required: false
  })
  @IsOptional()
  @IsJSON()
  attributes?: Record<string, any>
}

export class CreateProductWithVariantsDto {
  @ApiProperty({ example: 'Product 1', description: 'Tên sản phẩm' })
  @IsString()
  product_name: string

  @ApiProperty({ example: 'Description for product 1', description: 'Mô tả sản phẩm', required: false })
  @IsOptional()
  @IsString()
  description?: string

  @ApiProperty({ example: 1, description: 'ID danh mục', required: false })
  @IsOptional()
  @IsInt()
  category_id?: number

  @ApiProperty({ example: 1, description: 'ID thương hiệu', required: false })
  @IsOptional()
  @IsInt()
  brand_id?: number

  @ApiProperty({ example: 'Available', description: 'Trạng thái sản phẩm', required: false })
  @IsOptional()
  @IsString()
  product_status?: string

  @ApiProperty({
    type: [CreateProductVariantDto],
    description: 'Danh sách các biến thể của sản phẩm'
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateProductVariantDto)
  variants: CreateProductVariantDto[]
}
