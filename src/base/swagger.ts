import { Injectable, INestApplication } from '@nestjs/common';
import { BaseClass, getDefaultObject, isValidArray } from '@vodyani/core';
import { DocumentBuilder, SwaggerDocumentOptions, SwaggerModule } from '@nestjs/swagger';

import { VOContainer } from '../base';
import { BaseSwaggerOptions } from '../common';

@Injectable()
export class BaseSwagger {
  private extraModels = VOContainer.discovery();

  public deploy(application: INestApplication, options: BaseSwaggerOptions) {
    const { extraModels, documentOptions, documentRouter, documentConfig } = options;

    this.deployDefaultVo(extraModels);
    this.deployWithApplication(application, documentOptions, documentRouter, documentConfig);
  }

  private deployDefaultVo(extraModels: BaseClass[]) {
    if (isValidArray(extraModels)) {
      extraModels.forEach(vo => {
        this.extraModels.push(vo);
      });
    }
  }

  private deployWithApplication(
    application: INestApplication,
    options?: SwaggerDocumentOptions,
    documentRouter = 'docs',
    documentConfig = new DocumentBuilder().build(),
  ) {
    const documentOptions = { extraModels: this.extraModels, ...getDefaultObject(options) };
    const doc = SwaggerModule.createDocument(application, documentConfig, documentOptions);
    SwaggerModule.setup(documentRouter, application, doc);
  }
}
