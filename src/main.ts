import { NestFactory } from '@nestjs/core';
import { HttpAdapterHost } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/all-exception.filter';
import ApiInterceptor from './common/interceptors/api.interceptor';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    
    dotenv.config();
    
    app.useGlobalPipes(new ValidationPipe());

    const { httpAdapter } = app.get(HttpAdapterHost);
    app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

    app.useGlobalInterceptors(new ApiInterceptor());

    await app.listen(3000);
}
bootstrap();
