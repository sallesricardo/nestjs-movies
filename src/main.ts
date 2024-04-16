import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { abortOnError: false });
    const config = new DocumentBuilder()
        .setTitle('Movie catalog')
        .setDescription('The movie catalog API description')
        .setVersion('1.0')
        .addTag('movies')
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    console.log(`Starting server on port: ${process.env.PORT}`);
    await app.listen(process.env.PORT);
}
bootstrap();
