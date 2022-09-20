import { Controller, Get, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';

const logger = new Logger('AppController');

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    const data = this.appService.getHello();
    logger.debug(`AppController.getHello() => ${data}`);
    return data;
  }

  @MessagePattern({ cmd: 'hello' })
  cmdHello(data: string): string {
    logger.debug(`AppController.cmdHello(${data}) => 'hello ${data}'`);
    return `hello ${data}`;
  }
}
