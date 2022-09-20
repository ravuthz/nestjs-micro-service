import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

const logger = new Logger('NestApplication');

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['debug'],
  });

  const config = app.get<ConfigService>(ConfigService);

  await app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      host: '127.0.0.1',
      port: config.get('MS_PORT', 3001),
    },
  });

  app.startAllMicroservices();

  await app.listen(config.get('PORT', 3000)).then(async () => {
    logger.debug(`Server is listening on ${await app.getUrl()}`);
  });
}
bootstrap();
