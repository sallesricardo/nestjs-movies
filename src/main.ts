import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { abortOnError: false });
    console.log(`Starting server on port: ${process.env.PORT}`);
    await app.listen(process.env.PORT);
}
bootstrap();
