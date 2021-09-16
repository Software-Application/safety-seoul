import { NestFactory } from '@nestjs/core';
import { exit } from 'process';
import { AppModule } from './app.module';

type Config = {
  port: number;
}
async function preprocess() {
  const config: Config = {
    port: 3000,
  };
  config.port = parseInt(process.env.PORT) || 3000;
  return config;
}

async function bootstrap(config: Config) {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  await app.listen(config.port);
}

preprocess().then((config) => {
  bootstrap(config);
}).catch((err) => {
  console.error("Preprocessing Error.");
  exit(-1);
})
