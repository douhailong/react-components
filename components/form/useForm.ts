import { useRef } from 'react';
import FormStore from './store';
import type { FormInstance } from './types';

const getFormInstance = <
  FormData = any,
  FieldValue = FormData[keyof FormData],
  FieldKey extends keyof any = keyof FormData
>(): FormInstance<FormData, FieldValue, FieldKey> => {
  const formStore = new FormStore<FormData, FieldValue, FieldKey>();

  return {
    getFields: formStore.getFields,
    getFieldValue: formStore.getFieldValue,
    getFieldsValue: formStore.getFieldsValue,
    getFieldError: formStore.getFieldError,
    getFieldsError: formStore.getFieldsError,
    setFields: formStore.setFields,
    setFieldValue: formStore.setFieldValue,
    setFieldsValue: formStore.setFieldsValue,
    resetFields: formStore.resetFields,
    clearFields: formStore.clearFields,
    getTouchedFields: formStore.getTouchedFields,
    submit: formStore.submit,
    validate: formStore.validate,
    getFieldsState: formStore.getFieldsState
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
    if (form) {
      formRef.current = form;
    } else {
      formRef.current = getFormInstance();
    }
  }

  return [formRef.current];
};

export default useForm;
