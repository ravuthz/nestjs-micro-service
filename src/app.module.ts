import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as Joi from 'joi';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthModule } from './health/health.module';
import { RabbitmqModule } from './rabbitmq/rabbitmq.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      expandVariables: true,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'staging', 'production')
          .default('development'),
        PORT: Joi.number().default(3000),
        MS_PORT: Joi.number().default(3001),
        MS_URL: Joi.string().default(''),
      }),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: configService.get('DB_TYPE', 'postgres'),
          host: configService.get('DB_HOST', 'localhost'),
          port: +configService.get('DB_PORT', 5432),
          username: configService.get('DB_USER', 'postgres'),
          password: configService.get('DB_PASS', 'postgres'),
          database: configService.get('DB_NAME', 'postgres'),
          entities: [join(__dirname, '../', '**', '*.entity.{ts,js}')],
          synchronize: true, // should be false at production!
        } as TypeOrmModuleOptions;
      },
    }),
    HealthModule,
    RabbitmqModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
