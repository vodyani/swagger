import { Injectable, INestApplication } from '@nestjs/common';
import { SwaggerDocumentOptions, SwaggerModule as Swagger, OpenAPIObject, DocumentBuilder } from '@nestjs/swagger';

import { ExtraModelStore } from './struct';

@Injectable()
export class SwaggerProvider {
  public getConfigBuilder() {
    return new DocumentBuilder();
  }

  public setup(
    path: string,
    application: INestApplication,
    config: Omit<OpenAPIObject, 'paths'>,
    options?: SwaggerDocumentOptions,
  ) {
    const document = Swagger.createDocument(
      application,
      config,
      { extraModels: ExtraModelStore.get(), ...options },
    );

    Swagger.setup(path, application, document);
  }
}
