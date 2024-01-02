import { IsNotEmpty, MaxLength, MinLength } from 'class-validator'
import LoginAuthDto from './login-auth.dto'
import { ApiProperty } from '@nestjs/swagger'

export class RegisterAuthDto extends LoginAuthDto {
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(20)
  @ApiProperty()
  username: string
}
