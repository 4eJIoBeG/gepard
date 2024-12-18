import { NestFactory } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { AppModule } from './app.module'

import * as cookieParser from 'cookie-parser'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)

	app.use(cookieParser())
	app.enableCors({
		origin: [process.env.CLIENT_URL],
		credentials: true,
		exposedHeaders: 'set-cookie'
	})

	const config = new DocumentBuilder()
		.setTitle('Гепард документация')
		.setDescription('Описание методов работы с бэкендом')
		.setVersion('1.0')
		.addBearerAuth()
		.build()
	const document = SwaggerModule.createDocument(app, config)
	SwaggerModule.setup('docs', app, document, {
		swaggerOptions: { persistAuthorization: true }
	})

	await app.listen(process.env.PORT ?? 5000)
}
bootstrap()
