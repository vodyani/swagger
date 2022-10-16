import { Injectable, INestApplication } from '@nestjs/common';
import { SwaggerDocumentOptions, SwaggerModule as Swagger, OpenAPIObject } from '@nestjs/swagger';

import { SwaggerOptions } from './common';
import { ExtraModelStore } from './struct';

@Injectable()
export class SwaggerProvider {
  private options: SwaggerOptions = Object();

  public setPath(path: string) {
    this.options.path = path;
    return this;
  }

  public setNestApplication(app: INestApplication) {
    this.options.app = app;
    return this;
  }

  public setConfig(config: Omit<OpenAPIObject, 'paths'>) {
    this.options.config = config;
    return this;
  }

  public setup(options?: SwaggerDocumentOptions) {
    const { app, config, path } = this.options;
    const documentOptions = { extraModels: ExtraModelStore.get(), ...options };
    const document = Swagger.createDocument(app, config, documentOptions);

    Swagger.setup(path, app, document);
  }
}
