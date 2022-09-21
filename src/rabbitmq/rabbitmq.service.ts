import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { MS_API_GATWAY } from './../shared';

const logger = new Logger('RabbitmqService');

@Injectable()
export class RabbitmqService {
  constructor(@Inject(MS_API_GATWAY) private readonly client: ClientProxy) {}

  public send(pattern: string, data: object = {}) {
    logger.debug(`send: ${pattern}: `, data);
    return this.client.send(pattern, data);
  }

  public emit(pattern: string, data: object = {}) {
    logger.debug(`send: ${pattern}: `, data);
    return this.client.emit(pattern, data);
  }
}
