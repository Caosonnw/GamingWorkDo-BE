import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import * as cookieParser from 'cookie-parser'
import * as express from 'express'
import { AppModule } from './app.module'
import { ConfigService } from '@nestjs/config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors()
  app.use(express.static('.'))
  app.use(cookieParser())

  const config = new DocumentBuilder()
    .setTitle('Gaming Work Do Swagger')
    .setDescription('Gaming Work Do API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('/swagger', app, document)

  const port = process.env.PORT || 8080
  await app.listen(port)
  console.log(`Swagger: http://localhost:${port}/swagger`)
}
bootstrap()
