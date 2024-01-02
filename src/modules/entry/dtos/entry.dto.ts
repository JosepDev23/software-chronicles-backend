import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export default class EntryDto {
  @IsNotEmpty()
  @ApiProperty()
  userId: string

  @IsNotEmpty()
  @ApiProperty()
  date: Date

  @IsNotEmpty()
  @ApiProperty()
  body: string
}
