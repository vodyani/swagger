import { BaseClass } from '@vodyani/core';
import { OpenAPIObject, SwaggerDocumentOptions } from '@nestjs/swagger';

export interface BaseSwaggerOptions {
  extraModels: BaseClass[];
  documentRouter?: string;
  documentOptions?: SwaggerDocumentOptions;
  documentConfig?: Omit<OpenAPIObject, 'paths'>;
}
