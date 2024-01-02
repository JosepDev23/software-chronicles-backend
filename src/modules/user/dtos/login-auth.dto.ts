import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator'

export default class LoginAuthDto {
  @IsNotEmpty()
  @ApiProperty()
  phoneNumber: string

  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(20)
  @ApiProperty()
  password: string
}
