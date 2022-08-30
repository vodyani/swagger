import { Type, applyDecorators } from '@vodyani/core';
import { ApiOkResponse, getSchemaPath } from '@nestjs/swagger';

import { ExtraModelStore } from './struct';

export function SwaggerEntity(target: any) {
  ExtraModelStore.set(target?.name, target);
}

export function getResponseVo<T = any>(ResponseBodyVo: Type<T>) {
  return function(Vo?: Type<T>) {
    return applyDecorators(
      ApiOkResponse({
        schema: {
          allOf: [
            { $ref: getSchemaPath(ResponseBodyVo) },
            {
              properties: {
                data: Vo
                  ? { $ref: getSchemaPath(Vo) }
                  : { type: 'object' },
              },
            },
          ],
        },
      }),
    );
  };
}

export function getArrayResponseVo<T = any>(ResponseBodyVo: Type<T>) {
  return function(Vo?: Type<T>) {
    return applyDecorators(
      ApiOkResponse({
        schema: {
          allOf: [
            { $ref: getSchemaPath(ResponseBodyVo) },
            {
              properties: {
                data: Vo
                  ? { type: 'array', $ref: getSchemaPath(Vo) }
                  : { type: 'object' },
              },
            },
          ],
        },
      }),
    );
  };
}

export function getPaginationResponseVo<T = any, P = any>(ResponseBodyVo: Type<T>, PageVo: Type<P>) {
  return function(Vo?: Type) {
    return applyDecorators(
      ApiOkResponse({
        schema: {
          allOf: [
            { $ref: getSchemaPath(ResponseBodyVo) },
            {
              properties: {
                data: {
                  allOf: [
                    {
                      properties: {
                        page: { $ref: getSchemaPath(PageVo) },
                      },
                    },
                    {
                      properties: {
                        rows: {
                          type: 'array',
                          items: { $ref: getSchemaPath(Vo) },
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
