import {
  ClientProviderOptions,
  MicroserviceOptions,
  Transport,
} from '@nestjs/microservices';

export const { MS_URL } = process.env;

export const getMicroSeriveOptions = (name: string): MicroserviceOptions => {
  name = name.toUpperCase();
  const url = process.env.MS_URL || 'amqp://guest:guest@localhost:5672/hello';
  const queue = process.env[`${name}_QUEUE_NAME`] || 'default';
  const durable = process.env[`${name}_QUEUE_DURABLE`] || false;
  return {
    transport: Transport.RMQ,
    options: {
      urls: [url.trim()],
      queue: queue.trim(),
      queueOptions: {
        durable,
      },
    },
  };
};

export const getClientProviderOptions = (
  name: string,
): ClientProviderOptions => {
  return {
    name,
    ...getMicroSeriveOptions(name),
  } as ClientProviderOptions;
};
