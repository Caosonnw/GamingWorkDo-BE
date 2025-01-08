import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import * as cookieParser from 'cookie-parser'
import * as express from 'express'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors()
  app.use(express.static('.'))
  app.use(cookieParser())

  const config = new DocumentBuilder()
    .setTitle('Gaming Work Do Swagger')
    .setDescription('Gaming Work Do API description')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header'
      },
      'jwt'
    )
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('/swagger', app, document)

  const port = 8080
  await app.listen(port)
  console.log(`Swagger: http://localhost:${8080}/swagger`)
}
bootstrap()

// {
//   type: 'http',
//   scheme: 'bearer',
//   bearerFormat: 'JWT'
// },
// 'jwt'
