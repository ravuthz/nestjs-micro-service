
<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="100" alt="Nest Logo" /></a>
</p>

# NestJS Micro Service ( TCP )


## Description
NestJS micro service with default protocol ( TCP ) and PostgreSQL database.

## Installation

```bash
# Copy and config environment variables follow the .env.example
cp .env.example .env

# Install all dependencies using yarn or pnpm package manager
yarn install
```

## Running the app

```bash
# development
yarn start

# watch mode
yarn start:dev

# production mode
yarn start:prod
```

## Test

```bash
# unit tests
yarn test

# e2e tests
yarn test:e2e

# test coverage
yarn test:cov
```

## Clone this project as default microservice ( TCP )
```bash
npx degit https://github.com/ravuthz/nestjs-micro-service micro_product
```

```bash
git clone npx degit https://github.com/ravuthz/nestjs-micro-service micro_product
```

## Clone this project as RabbitMQ microservice ( RMQ )
```bash
npx degit https://github.com/ravuthz/nestjs-micro-service#rabbitmq micro_category
```

```bash
git clone --single-branch --branch rabbitmq https://github.com/ravuthz/nestjs-micro-service
```

NOTE:
- The **micro_product** the new project name, default is **nestjs-micro-service**
- The ``pnpm`` also support, just replace ``pnpm`` instead of ``yarn`` 

```bash
  # Example
  
  pnpm install
  
  pnpm start:dev
```
