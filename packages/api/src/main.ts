import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getRootDomain } from '@readfyi/shared';

const allowedDomains = [
	'localhost',
	'readfyi.com',
]

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.enableCors({
		origin: (origin, callback) => {
			if (!origin) return callback(null, true) // allow non-browser requests (like Postman)

			const isAllowed = allowedDomains.includes(getRootDomain(origin))

			if (isAllowed) return callback(null, true)

			callback(new Error(`Origin: ${origin} is not allowed by CORS policy.`))
		},
		credentials: true
	})

	await app.listen(process.env.PORT ?? 8080);
}
bootstrap();
