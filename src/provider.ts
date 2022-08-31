import { Injectable, INestApplication } from '@vodyani/core';
import { SwaggerDocumentOptions, SwaggerModule, OpenAPIObject, DocumentBuilder } from '@nestjs/swagger';

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
    const document = SwaggerModule.createDocument(
      application,
      config,
      { extraModels: ExtraModelStore.get(), ...options },
    );

    SwaggerModule.setup(path, application, document);
  }
}
