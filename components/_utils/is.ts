const strProto = Object.prototype.toString;

export const isString = (tar: unknown): tar is string =>
  typeof tar === 'string';
export const isNumber = (tar: unknown) => typeof tar === 'number';
export const isBoolean = (tar: unknown) => typeof tar === 'boolean';
export const isFunction = (tar: unknown) => typeof tar === 'function';
export const isArray = (tar: unknown) => Array.isArray(tar);
export const isObject = (tar: unknown) =>
  strProto.call(tar) === '[object Object]';
export const isExist = (tar: any): boolean => tar || tar === 0;
