import { useRef } from 'react';
import Store from './store';
import type { FormInstance, InnerMethods } from './types';

const innerMethodsKey = [
  'registerField',
  'registerWatcher',
  'registerStateWatcher',
  'registerFormWatcher',
  'innerSetInitialValues',
  'innerSetInitialValue',
  'innerSetCallbacks',
  'innerSetFieldValue',
  'innerGetStore',
  'innerGetStoreStatus',
  'innerGetFieldValue',
  'innerCollectFormState'
] as const;

export type InnerMethodsKey = (typeof innerMethodsKey)[number];

const getFormInstance = <
  FormData = any,
  FieldValue = FormData[keyof FormData],
  FieldKey extends keyof any = keyof FormData
>(): FormInstance<FormData, FieldValue, FieldKey> => {
  const store = new Store<FormData, FieldValue, FieldKey>();

  return {
    getFields: store.getFields,
    getFieldsValue: store.getFieldsValue,
    getFieldValue: store.getFieldValue,
    getFieldsError: store.getFieldsError,
    getFieldError: store.getFieldError,
    getTouchedFields: store.getTouchedFields,
    setFields: store.setFields,
    setFieldsValue: store.setFieldsValue,
    setFieldValue: store.setFieldValue,
    resetFields: store.resetFields,
    clearFields: store.clearFields,
    submit: store.submit,
    validate: store.validate,
    getFieldsState: store.getFieldsState,
    scrollToField: () => {},
    getInnerMethods: (isInner?: boolean) => {
      const methods = {} as InnerMethods<FormData, FieldValue, FieldKey>;

      if (isInner) {
        innerMethodsKey.forEach((key) => (methods[key] = store[key]));
      }

      return methods;
    }
  };
};

const useForm = <
  FormData = any,
  FieldValue = FormData[keyof FormData],
  FieldKey extends keyof any = keyof FormData
>(
  form: FormInstance<FormData, FieldValue, FieldKey>
) => {
  const formRef = useRef(form);

  if (!formRef.current) {
    formRef.current = form ?? getFormInstance<FormData, FieldValue, FieldKey>();
  }
  return [formRef.current];
};

export default useForm;
