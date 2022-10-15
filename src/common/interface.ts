import { INestApplication } from '@nestjs/common';
import { OpenAPIObject } from '@nestjs/swagger';

export interface SwaggerOptions {
  path: string;
  app: INestApplication;
  config: Omit<OpenAPIObject, 'paths'>;
}
