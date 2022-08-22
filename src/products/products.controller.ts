import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  // eslint-disable-next-line prettier/prettier
  Post
} from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  @Post()
  addProduct(
    //Option 1
    // @Body() completeBody: {title: string, description: string, price: number},

    //Option 2
    @Body('title') prodTitle: string,
    @Body('description') proDesc: string,
    @Body('price') proPrice: number,
  ) {
    const generatedId = this.productsService.insertProduct(
      prodTitle,
      proDesc,
      proPrice,
    );
    return { id: generatedId };
  }
  @Get()
  getAllProducts() {
    return this.productsService.getProducts();
  }
  @Get(':id')
  getProduct(@Param('id') prodId: string) {
    return this.productsService.getSingleProduct(prodId);
  }
  @Patch(':id')
  updateProduct(
    @Param('id') prodId: string,
    @Body('title') prodTitle: string,
    @Body('description') proDesc: string,
    @Body('price') proPrice: number,
  ) {
    this.productsService.updateProduct(prodId, prodTitle, proDesc, proPrice);
    return null;
  }
  @Delete(':id')
  removeProduct(@Param('id') prodId: string) {
    this.productsService.deleteProduct(prodId);
    return null;
  }
}
