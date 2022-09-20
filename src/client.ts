import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import {
  ClientOptions,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { AppModule } from './app.module';

(async () => {
  const app = await NestFactory.create(AppModule);
  const config = app.get<ConfigService>(ConfigService);

  const microserviceOptions: ClientOptions = {
    transport: Transport.TCP,
    options: {
      host: '127.0.0.1',
      port: config.get('MS_PORT', 3001),
    },
  };

  const client = ClientProxyFactory.create(microserviceOptions);

  client
    .send<string, string>({ cmd: 'hello' }, 'client1')
    .subscribe((res) => console.log('result1: ', res));

  client
    .send<string, string>({ cmd: 'hello' }, 'client2')
    .subscribe((res) => console.log('result2: ', res));
})();
