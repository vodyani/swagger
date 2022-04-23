import { Class } from '@vodyani/core';
import { Type, applyDecorators } from '@nestjs/common';
import { ApiOkResponse, getSchemaPath } from '@nestjs/swagger';

import { VOContainer } from '../base';

export function SwaggerVo(target: any) {
  VOContainer.registry(target?.name, target);
}

export function getApiResponseVo<T extends Type<any>>(responseBodyVo: Class) {
  return function (swaggerVo?: T) {
    return applyDecorators(
      ApiOkResponse({
        schema: {
          allOf: [
            { $ref: getSchemaPath(responseBodyVo) },
            {
              properties: {
                data: swaggerVo
                  ? { $ref: getSchemaPath(swaggerVo) }
                  : { type: 'object' },
              },
            },
          ],
        },
      }),
    );
  };
}

export function getApiArrayResponseVo<T extends Type<any>>(responseBodyVo: Class) {
  return function (swaggerVo?: T) {
    return applyDecorators(
      ApiOkResponse({
        schema: {
          allOf: [
            { $ref: getSchemaPath(responseBodyVo) },
            {
              properties: {
                data: swaggerVo
                  ? { type: 'array', $ref: getSchemaPath(swaggerVo) }
                  : { type: 'object' },
              },
            },
          ],
        },
      }),
    );
  };
}

export function getApiPaginationResponseVo<T extends Type<any>>(responseBodyVo: Class, paginationInfoVo: Class) {
  return function (swaggerVo?: T) {
    return applyDecorators(
      ApiOkResponse({
        schema: {
          allOf: [
            { $ref: getSchemaPath(responseBodyVo) },
            {
              properties: {
                data: {
                  allOf: [
                    {
                      properties: {
                        page: { $ref: getSchemaPath(paginationInfoVo) },
                      },
                    },
                    {
                      properties: {
                        rows: {
                          type: 'array',
                          items: { $ref: getSchemaPath(swaggerVo) },
                        },
                      },
                    },
                  ],
                },
              },
            },
          ],
        },
      }),
    );
  };
}
