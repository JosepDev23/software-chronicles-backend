import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { FilterQuery, Model } from 'mongoose'
import Entry from './entry.schema'
import EntryDto from './dtos/entry.dto'

@Injectable()
export class EntryService {
  constructor(@InjectModel('Entry') private entryModel: Model<Entry>) {}

  async findByUserId(userId: string, limit: number = 20, offset: number = 0) {
    const filter: FilterQuery<Entry> = { userId: new RegExp(userId, 'i') }
    return this.entryModel.find(filter).limit(limit).skip(offset).exec()
  }

  async save(entryDto: EntryDto): Promise<Entry> {
    const savedEntry = new this.entryModel(entryDto)
    return savedEntry.save()
  }
}
