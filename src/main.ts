import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './common/filters/http-exception.filter';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // This will validate DTOs globaly
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // strips unallowed properties
      forbidNonWhitelisted: true, // throws if ekstra props are sent
      transform: true, // transforms payloads to DTO classes
    }),
  );

  app.useGlobalFilters(new AllExceptionsFilter());

  // ✅ Swagger Setup
  const config = new DocumentBuilder()
    .setTitle('Invoice Service API')
    .setDescription('API documentation for the invoice service')
    .setVersion('1.0')
    .addTag('invoices') // optional
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // http://localhost:3000/api

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
