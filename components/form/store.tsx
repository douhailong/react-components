import { get, set } from 'lodash-es';
import { isArray, isExist } from '../_utils/is';
import { cloneDeep } from './_utils';

type DeepPartial<T> = T extends object
  ? {
      [K in keyof T]?: DeepPartial<T[K]>;
    }
  : T;

type DispatchType = 'setFieldValue' | 'reset' | 'innerSetValue';

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

  public getFields = (): Partial<FormData> => cloneDeep(this.store);

  public getFieldsValue = (fields: FieldKey[]): Partial<FormData> => {
    const values = {};

    if (isArray(fields)) {
      for (const field of fields) {
        set(values, field, this.getFieldValue(field));
      }
      return values;
    }

    // TODO 获取所有注册的字段值返回
    return values;
  };

  public getFieldValue = (field: FieldKey): FieldValue => {
    return cloneDeep(get(this.store, field));
  };

  public getFieldError = () => {};
  public getFieldsError = () => {};
  public getTouchedFields = () => {};

  public setFieldValue = (field: FieldKey, value: FieldValue) => {
    if (field === undefined || field === null) return;
    this.setFields();
  };

  public setFieldsValue = () => {};
  public setFields = () => {};

  public resetFields = (fields: FieldKey | FieldKey[]) => {
    const keys = isExist(fields) && !isArray(fields) ? [fields] : fields;

    if (isArray(keys)) {
      for (const key in keys) {
        set(this.store, key, this.initialValues[key as keyof FormData]);
      }
    }
  };

  public clearFields = () => {};
  public submit = () => {};
  public validate = () => {};
  public getFieldsState = () => {};
}

export default FormStore;
