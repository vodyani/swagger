import { Class } from '@vodyani/core';
import { OpenAPIObject, SwaggerDocumentOptions } from '@nestjs/swagger';

export interface BaseSwaggerOptions {
  extraModels: Class[];
  documentRouter?: string;
  documentOptions?: SwaggerDocumentOptions;
  documentConfig?: Omit<OpenAPIObject, 'paths'>;
}
