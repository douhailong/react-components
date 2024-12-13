import { type PropertyPath, cloneDeepWith, set as lodashSet } from 'lodash-es';
import { isObject, isArray } from '../_utils/is';

export const cloneDeep = (value: unknown) =>
  cloneDeepWith(value, (val) => {
    if (!isObject(val) && !isArray(val)) {
      return val;
    }
  });

export const set = <T extends Record<string, any>>(target: T, field: PropertyPath, value: any) => {
  lodashSet(target, field, cloneDeep(value));
  return target;
};
