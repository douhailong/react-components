import { cloneDeepWith } from 'lodash-es';
import { isObject, isArray } from '../_utils/is';

export const cloneDeep = (value: unknown) =>
  cloneDeepWith(value, (val) => {
    if (!isObject(val) && !isArray(val)) {
      return val;
    }
  });
