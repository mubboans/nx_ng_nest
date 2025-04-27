import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let responseBody = {
      message: 'Internal server error',
      success: false,
      status: 'Failed',
      error: null
    };

    if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === 'object') {
        responseBody = exceptionResponse as any;
      } else {
        responseBody.message = exception.message;
      }
    } else if (exception instanceof Error) {
      responseBody.message = exception.message || 'Something went wrong';
      responseBody.error = process.env.NODE_ENV === 'production' ? undefined : exception.stack;
    }

    response.status(statusCode).json(responseBody);
  }
}
