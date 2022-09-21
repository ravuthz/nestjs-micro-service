import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { getMicroSeriveOptions, MS_API_GATWAY } from './shared';

const logger = new Logger('NestApplication');

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['debug'],
  });

  const config = app.get<ConfigService>(ConfigService);

  await app.connectMicroservice<MicroserviceOptions>(
    getMicroSeriveOptions(MS_API_GATWAY),
  );

  app.startAllMicroservices();

  await app.listen(config.get('PORT', 3000)).then(async () => {
    logger.debug(`Server is listening on ${await app.getUrl()}`);
  });
}
bootstrap();
