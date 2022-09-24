import { Module } from '@nestjs/common';

import { SwaggerProvider } from './provider';

@Module({
  providers: [SwaggerProvider],
  exports: [SwaggerProvider],
})
export class SwaggerModule {}

