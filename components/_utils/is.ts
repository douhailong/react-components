const strProto = Object.prototype.toString;

export const isString = (arg: unknown): arg is string => typeof arg === 'string';
export const isNumber = (arg: unknown) => typeof arg === 'number';
export const isBoolean = (arg: unknown) => typeof arg === 'boolean';
export const isFunction = (arg: unknown) => typeof arg === 'function';
export const isArray = (arg: unknown) => Array.isArray(arg);
export const isObject = (arg: unknown) => strProto.call(arg) === '[object Object]';
export const isExist = (arg: any): boolean => arg || arg === 0;
