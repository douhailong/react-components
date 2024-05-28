import { cloneDeepWith } from 'lodash-es';

const isObject = () => true;
const isArray = () => true;

const cloneDeep = <T>(value: T) =>
  cloneDeepWith(value, (val) => {
    if (!isObject() && !isArray()) {
      return val;
    }
  });
