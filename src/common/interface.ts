import { BaseClass } from '@vodyani/core';
import { OpenAPIObject, SwaggerDocumentOptions } from '@nestjs/swagger';

export interface BaseSwaggerOptions {
  enable: boolean;
  extraModels: BaseClass[];
  documentRouter?: string;
  documentConfig?: Omit<OpenAPIObject, 'paths'>;
  documentOptions?: SwaggerDocumentOptions;
}
