import { AppException } from "../exception/app.exception";


/**
 * A decorator that wraps the method in a try-catch block
 * Similar to the original TryCatch function
 */
export function TryCatch() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      try {
        return await originalMethod.apply(this, args);
      } catch (e) {
        // If it's already an AppException, just re-throw it
        if (e instanceof AppException) {
          throw e;
        }

        console.log(e, 'error throw from trycatch');
        throw new AppException(
          e?.message || 'Something went wrong',
          e?.status || 400,
          e
        );
      }
    };

    return descriptor;
  };
}
