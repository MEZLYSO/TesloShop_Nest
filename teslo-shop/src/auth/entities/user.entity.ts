import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('users')
export class User {

  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({
    type: 'text',
    unique: true
  })
  email: string

  @Column('text', {
    select: false
  })
  password: string

  @Column('text')
  fullname: string

  @Column({
    type: 'bool',
    default: true
  })
  isActive: boolean

  @Column({
    type: 'text',
    array: true,
    default: ['user']
  })
  roles: string[]
}
