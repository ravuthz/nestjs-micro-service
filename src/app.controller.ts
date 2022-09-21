import { Controller, Get, Logger } from '@nestjs/common';
import {
  Ctx,
  EventPattern,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { AppService } from './app.service';
import { RabbitmqService } from './rabbitmq/rabbitmq.service';

const logger = new Logger('AppController');

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly rmqService: RabbitmqService,
  ) {}

  @Get()
  getHello(): string {
    const data = this.appService.getHello();
    const payload = {
      data: 'hello',
      timestamp: new Date().getTime(),
      from: 'nestjs-micro-service.application',
    };
    this.rmqService.send('hello', payload);
    this.rmqService.emit('emit.hello', payload);
    return data;
  }

  @MessagePattern('hello')
  cmdHello(@Payload() payload: any, @Ctx() context: RmqContext): object {
    const pattern = context.getPattern();
    logger.debug('AppController.cmdHello', { pattern, payload });
    return { pattern, payload };
  }

  @EventPattern('emit.hello')
  emitHello(@Payload() payload: any, @Ctx() context: RmqContext) {
    const pattern = context.getPattern();
    logger.debug('AppController.emitHello', { pattern, payload });
  }
}
