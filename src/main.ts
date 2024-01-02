import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import * as dotenv from 'dotenv'

async function bootstrap() {
  dotenv.config()

  const app = await NestFactory.create(AppModule)

  const swaggerConfig = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Software Chronicles API')
    .setDescription('Documentation')
    .setVersion('0.1')
    .build()
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig)
  SwaggerModule.setup('api', app, swaggerDocument)

  await app.listen(process.env.PORT || 3001)
}

bootstrap()
