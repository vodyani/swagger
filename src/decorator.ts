import { Type, applyDecorators } from '@vodyani/core';
import { ApiBody, ApiConsumes, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';

import { ExtraModelStore } from './struct';

export function SwaggerEntity(target: any) {
  ExtraModelStore.set(target?.name, target);
}

export function ApiFormData(options: any) {
  return applyDecorators(
    ApiConsumes('multipart/form-data'),
    ApiBody(options),
  );
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
