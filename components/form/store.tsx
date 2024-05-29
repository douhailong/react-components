import { get, set } from 'lodash-es';
import { isArray } from '../_utils/is';
import { cloneDeep } from './_utils';

type DeepPartial<T> = T extends object
  ? {
      [K in keyof T]?: DeepPartial<T[K]>;
    }
  : T;

class FormStore<
  FormData = any,
  FieldValue = FormData[keyof FormData],
  FieldKey extends keyof any = keyof FormData
> {
  private store: Partial<FormData> = {};
  private initialValues: Partial<FormData> = {};

  private formListeners: (() => void)[] = [];
  private fieldListeners: (() => void)[] = [];

  private dispatchFormAction = () => {
    for (const listener of this.formListeners) {
      listener();
    }
  };
  private dispatchFieldAction = () => {
    for (const listener of this.fieldListeners) {
      listener();
    }
  };

  public getFieldsValue = (fields: FieldKey[]) => {
    const values = {};

    if (isArray(fields)) {
      for (const field of fields) {
        set(values, field, this.getFieldValue(field));
      }
      return values;
    }
    // ?????------
  };

  public getFieldValue = (field: FieldKey): FieldValue => {
    return cloneDeep(get(this.store, field));
  };

  public getFieldError = () => {};
  public getFieldsError = () => {};
  public getTouchedFields = () => {};
  public getFields = (): Partial<FormData> => cloneDeep(this.store);

  public setFieldValue = (field: FieldKey, value: FieldValue) => {
    if (field === undefined || field === null) return;
    this.setFields();
  };

  public setFieldsValue = () => {};
  public setFields = () => {};

  public resetFields = () => {};

  public clearFields = () => {};
  public submit = () => {};
  public validate = () => {};
  public getFieldsState = () => {};
}

export default FormStore;
