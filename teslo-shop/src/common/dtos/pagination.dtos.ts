import { Type } from "class-transformer"
import { IsOptional, IsPositive, Min } from "class-validator"

export class PaginationDto {

  @IsOptional()
  @IsPositive()
  // Transformar data
  // Transformacion implicita del dato
  @Type(() => Number)
  limit?: number

  @IsOptional()
  @IsPositive()
  @Min(0)
  // Transformacion implicita del dato
  @Type(() => Number)
  offset?: number
}
