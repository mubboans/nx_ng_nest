import { Global, Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { DatabaseHelpers } from '../database-helper/db-helpers';
import { HttpExceptionFilter } from '../filters/http-exception.filter';


@Global()
@Module({
  providers: [
    DatabaseHelpers,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    }
  ],
  exports: [DatabaseHelpers]
})
export class CommonModule { }
