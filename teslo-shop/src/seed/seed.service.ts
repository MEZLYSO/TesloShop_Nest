import { Injectable } from '@nestjs/common';
import { ProductsService } from 'src/products/products.service';
import { initialData } from './data/seed-data';

@Injectable()
export class SeedService {

  constructor(
    private readonly productService: ProductsService
  ) { }

  async runSeed() {
    await this.insertNewProducts()
    return 'Seed execute'
  }

  private async insertNewProducts() {
    await this.productService.deleteAllProducts()

    const products = initialData.products;

    // Solucion array de promesas se tiene que definir el tipo 
    // de promesa ademas de definir el parametro de tipo
    const insertPromises: Promise<any>[] = []

    products.forEach(product => {
      insertPromises.push(this.productService.create(product))
    })

    await Promise.all(insertPromises)

    return true
  }

}
