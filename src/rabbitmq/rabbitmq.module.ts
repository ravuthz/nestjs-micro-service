import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { MS_API_GATWAY } from '../shared/constants';
import { getClientProviderOptions } from '../shared/utils';
import { RabbitmqService } from './rabbitmq.service';

@Module({
  imports: [ClientsModule.register([getClientProviderOptions(MS_API_GATWAY)])],
  providers: [RabbitmqService],
  exports: [RabbitmqService],
})
export class RabbitmqModule {}
