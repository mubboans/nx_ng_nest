import { HttpException, HttpStatus } from '@nestjs/common';

export class AppException extends HttpException {
  constructor(
    message: string,
    statusCode: HttpStatus = HttpStatus.BAD_REQUEST,
    public readonly errorData: any = null
  ) {
    super(
      {
        message,
        success: false,
        error: errorData,
        status: 'Failed'
      },
      statusCode
    );
  }

  static notFound(message = 'Resource not found', errorData = null): AppException {
    return new AppException(message, HttpStatus.NOT_FOUND, errorData);
  }

  static badRequest(message = 'Bad request', errorData = null): AppException {
    return new AppException(message, HttpStatus.BAD_REQUEST, errorData);
  }

  static serverError(message = 'Internal server error', errorData = null): AppException {
    return new AppException(message, HttpStatus.INTERNAL_SERVER_ERROR, errorData);
  }

  static unauthorized(message = 'Unauthorized', errorData = null): AppException {
    return new AppException(message, HttpStatus.UNAUTHORIZED, errorData);
  }

  static forbidden(message = 'Forbidden', errorData = null): AppException {
    return new AppException(message, HttpStatus.FORBIDDEN, errorData);
  }

  static conflict(message = 'Conflict', errorData = null): AppException {
    return new AppException(message, HttpStatus.CONFLICT, errorData);
  }
}
