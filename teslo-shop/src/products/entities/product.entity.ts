import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('text',
    // Reglas definidas como el titulo como unico
    { unique: true })
  title: string

  @Column('float', {
    default: 0
  })
  price: number

  @Column({
    type: 'text',
    nullable: true
  })
  description: string

  @Column({
    type: 'text',
    unique: true
  })
  slug: string

  @Column({
    type: 'int',
    default: 0
  })
  stock: number

  @Column({
    type: 'text',
    array: true
  })
  sizes: string[]

  @Column('text')
  gender: string

  // Tags 

  @Column({
    type: 'text',
    default: []
  })
  tags: string[]

  // Verificacion antes de insertar en la base de datos 
  // usando el decorador utilizado
  @BeforeInsert()
  checkSlugInsert() {
    if (!this.slug) {
      this.slug = this.title
    }
    this.slug = this.slug
      .toLowerCase()
      .replaceAll(' ', '_')
      .replaceAll("'", '')
  }

  // Verificacion antes de actualizar en la base de datos 
  // usando el decorador utilizado
  @BeforeUpdate()
  checkSlugUpdate() {
    this.slug = this.slug
      .toLowerCase()
      .replaceAll(' ', '_')
      .replaceAll("'", '')
  }


}
