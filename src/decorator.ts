import { Type, applyDecorators } from '@nestjs/common';
import { ApiOkResponse, getSchemaPath } from '@nestjs/swagger';

import { ExtraModelStore } from './struct';

export function SwaggerEntity(target: any) {
  ExtraModelStore.set(target?.name, target);
}

export function getResponseVo(ResponseBodyVo: Type) {
  return function(Vo?: Type) {
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

export function getArrayResponseVo(ResponseBodyVo: Type) {
  return function(Vo?: Type) {
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

export function getPaginationResponseVo(ResponseBodyVo: Type, PageVo: Type) {
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
