import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { ApiProperty } from '@nestjs/swagger'

@Schema()
export default class User {
  @Prop()
  @ApiProperty()
  username: string

  @Prop()
  @ApiProperty()
  password: string

  @Prop()
  @ApiProperty()
  phoneNumber: string
}

export const UserSchema = SchemaFactory.createForClass(User)
