import { Type, applyDecorators } from '@nestjs/common';
import { ApiOkResponse, getSchemaPath } from '@nestjs/swagger';

import { ExtraModelStore } from './struct';

export function SwaggerEntity(target: any) {
  ExtraModelStore.set(target?.name, target);
}

export function getResponseVO(ResponseBodyVO: Type) {
  return function(VO?: Type) {
    return applyDecorators(
      ApiOkResponse({
        schema: {
          allOf: [
            { $ref: getSchemaPath(ResponseBodyVO) },
            {
              properties: {
                data: VO
                  ? { $ref: getSchemaPath(VO) }
                  : { type: 'object' },
              },
            },
          ],
        },
      }),
    );
  };
}

export function getArrayResponseVO(ResponseBodyVO: Type) {
  return function(VO?: Type) {
    return applyDecorators(
      ApiOkResponse({
        schema: {
          allOf: [
            { $ref: getSchemaPath(ResponseBodyVO) },
            {
              properties: {
                data: VO
                  ? { type: 'array', $ref: getSchemaPath(VO) }
                  : { type: 'object' },
              },
            },
          ],
        },
      }),
    );
  };
}

export function getPaginationResponseVO(ResponseBodyVO: Type, PageVO: Type) {
  return function(VO?: Type) {
    return applyDecorators(
      ApiOkResponse({
        schema: {
          allOf: [
            { $ref: getSchemaPath(ResponseBodyVO) },
            {
              properties: {
                data: {
                  allOf: [
                    {
                      properties: {
                        page: { $ref: getSchemaPath(PageVO) },
                      },
                    },
                    {
                      properties: {
                        rows: {
                          type: 'array',
                          items: { $ref: getSchemaPath(VO) },
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
