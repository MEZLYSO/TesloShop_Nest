import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { PaginationDto } from 'src/common/dtos/pagination.dtos';
import { validate as isUUID } from 'uuid'

@Injectable()
export class ProductsService {

  private readonly logger = new Logger('ProductsService')

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>
  ) { }

  async create(createProductDto: CreateProductDto) {
    try {
      // Crea instancia del producto
      const product = this.productRepository.create(createProductDto)
      // Graba la sentencia en la base de datos
      await this.productRepository.save(product)
      return product
    } catch (err) {
      this.handleDB(err)
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;
    return await this.productRepository.find({
      take: limit,
      skip: offset
    })
  }

  async findOne(term: string) {
    let product: Product | null = null;

    if (isUUID(term)) {
      product = await this.productRepository.findOneBy({ id: term })
    } else {
      const queryBuilder = this.productRepository.createQueryBuilder()
      product = await queryBuilder.where('UPPER(title)= :title or slug= :slug', {
        title: term.toUpperCase(),
        slug: term.toLowerCase()
      }).getOne()
    }

    if (!product) {
      throw new NotFoundException(`Product with id ${term} not found`)
    }
    return product
  }

  async update(id: string, updateProductDto: UpdateProductDto) {

    try {
      const product = await this.productRepository.preload({
        id: id,
        ...updateProductDto
      })
      if (!product) {
        throw new BadRequestException(`Product with id:${id} not found`)
      }
      await this.productRepository.save(product)
      return product
    } catch (err) {
      this.handleDB(err)
    }

  }

  async remove(id: string) {
    const product = await this.findOne(id)
    await this.productRepository.remove(product)
  }

  private handleDB(err: any) {
    if (err.code === '23505')
      throw new BadRequestException(err.detail)
    this.logger.error(err)
    throw new InternalServerErrorException('Check logs to server')

  }
}
