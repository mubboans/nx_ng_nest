import { HttpStatus } from '@nestjs/common';

/**
 * Utility function to create a success response
 * Similar to the returnResponse function in your original code
 */
export function returnResponse(
  statusCode: HttpStatus = HttpStatus.OK,
  message = 'Success',
  data: any = null
) {
  return {
    statusCode,
    message,
    success: true,
    data,
  };
}
