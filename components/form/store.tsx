import { get, set } from 'lodash-es';
import { isArray } from '../_utils/is';
import { cloneDeep } from './_utils';

class FormStore<
  FormData = any,
  FieldValue = FormData[keyof FormData],
  FieldKey extends keyof any = keyof FormData
> {
  private store: Partial<FormData> = {};
  private initialValues: Partial<FormData> = {};

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
  public getFields = () => {};
  public setFieldValue = () => {};
  public setFieldsValue = () => {};
  public setFields = () => {};

  public resetFields = () => {};

  public clearFields = () => {};
  public submit = () => {};
  public validate = () => {};
  public getFieldsState = () => {};
}

export default FormStore;
