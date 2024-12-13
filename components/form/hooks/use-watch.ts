import { useState, useContext, useEffect, useRef } from 'react';
import { get } from 'lodash-es';
import { isString } from '../../_utils/is';
import { FormContext } from '../context';
import { FormInstance } from '../types';

const useWatch = (fieldKeys: string | string[], form?: FormInstance) => {
  const formContext = useContext(FormContext);
  const [formInstance] = useState(() => form ?? formContext.store);
  const [values, setValues] = useState(() => {
    const fieldValues = formInstance.getFieldsValue([].concat(fieldKeys));
    return isString(fieldKeys) ? get(fieldValues, fieldKeys) : fieldValues;
  });

  useEffect(() => {
    if (!formInstance) return;

    const { registerWatcher } = formInstance.getInnerMethods(true);

    const unRegisterWatcher = registerWatcher(values);

    return () => unRegisterWatcher();
  }, []);
};

export default useWatch;
