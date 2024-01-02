import { Prop, Schema } from '@nestjs/mongoose'
import { ApiProperty } from '@nestjs/swagger'

@Schema()
export default class Entry {
  @Prop({ index: true })
  @ApiProperty()
  userId: string

  @Prop()
  @ApiProperty()
  date: Date

  @Prop()
  @ApiProperty()
  body: string
}
