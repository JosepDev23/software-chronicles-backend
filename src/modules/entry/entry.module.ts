import { Module } from '@nestjs/common'
import { EntryController } from './entry.controller'
import { EntryService } from './entry.service'
import { MongooseModule } from '@nestjs/mongoose'
import Entry, { EntrySchema } from './entry.schema'

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Entry.name,
        schema: EntrySchema,
      },
    ]),
  ],
  controllers: [EntryController],
  providers: [EntryService],
})
export class EntryModule {}
