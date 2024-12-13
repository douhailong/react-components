import type { ValidateFieldsErrors } from './types';

class ValidateError<FieldValue = any, FieldKey extends keyof any = string> extends Error {
  errors: ValidateFieldsErrors<FieldValue, FieldKey> = {} as ValidateFieldsErrors<
    FieldValue,
    FieldKey
  >;

  constructor(errors?: ValidateFieldsErrors<FieldValue, FieldKey>) {
    super('form validate error, get errors by error.errors');

    this.errors = errors;
  }
}

/**
 * 回调函数转异步函数
 */
const promisify = <T>(fn: (...args: any[]) => any): (() => Promise<T>) => {
  // 保持函数名统一
  return Object.defineProperty(
    function (...args: any[]) {
      if (typeof args[args.length - 1] === 'function') return fn.apply(this, args);

      return new Promise((resolve, reject) => {
        args[args.length] = (error, response) => {
          if (error) reject(new ValidateError(error));
          resolve(response);
        };
        args.length++;
        fn.apply(this, args);
      });
    },
    'name',
    { value: fn.name }
  );
};

export default promisify;
