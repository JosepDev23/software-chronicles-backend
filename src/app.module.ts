import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { UserModule } from './modules/user/user.module'
import { ConfigModule } from '@nestjs/config'
import { EntryModule } from './modules/entry/entry.module'

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.PROD_USER}:${process.env.PROD_PASSWORD}@${process.env.PROD_CLUSTER}.gnpxbhu.mongodb.net/${process.env.PROD_DATABASE}?retryWrites=true&w=majority`,
    ),
    UserModule,
    EntryModule,
  ],
})
export class AppModule {}
