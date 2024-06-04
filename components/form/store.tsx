import { get, set } from 'lodash-es';
import { isArray, isExist } from '../_utils/is';
import { cloneDeep } from './_utils';
import { FormProps, SubmitStatus, FieldError } from './types';

type DeepPartial<T> = T extends object
  ? {
      [K in keyof T]?: DeepPartial<T[K]>;
    }
  : T;

type DispatchType = 'setFieldValue' | 'reset' | 'innerSetValue';
type InnerCallbackType = 'onValuesChange' | 'onSubmit' | 'onChange' | 'onSubmitFailed';

class FormStore<
  FormData = any,
  FieldValue = FormData[keyof FormData],
  FieldKey extends keyof any = keyof FormData
> {
  // 表单提交状态 非字段
  private submitStatus = SubmitStatus.init;

  private registerFields = [];

  // form item value变动注册到这里
  private registerWatchers: (() => void)[] = [];

  // form item 内部 errors, validating, touched 状态的变化注册到这里
  private registerStateWatchers: (() => void)[] = [];

  // form整体变动注册到这里
  private registerFormWatchers: (() => void)[] = [];

  private touchedFields: { [key: string]: unknown } = {};

  private store: Partial<FormData> = {};

  private initialValues: Partial<FormData> = {};

  private callbacks: Pick<FormProps<FormData, FieldValue, FieldKey>, InnerCallbackType> & {
    onValidateFail?: (errors: {
      [key in FieldKey]: FieldError<FieldValue>;
    }) => void;
  } = {};

  private notifyWatchers() {
    this.registerWatchers.forEach((watcher) => watcher());
  }

  private notifyStateWatchers() {
    this.registerStateWatchers.forEach((watcher) => watcher());
  }

  private notifyFormWatchers() {
    this.registerFormWatchers.forEach((watcher) => watcher());
  }

  private triggerValuesChange(values: Partial<FormData>) {
    if (values && Object.keys(values).length) {
      const { onValuesChange } = this.callbacks;
      onValuesChange && onValuesChange(values, this.getFields());
    }
    this.notifyWatchers();
  }

  private triggerTouchChange(value: Partial<FormData>) {
    if (value && Object.keys(value).length) {
      const { onChange } = this.callbacks;
      onChange && onChange(value, this.getFields());
    }
  }

  public innerCollectFormState = () => {
    this.notifyStateWatchers();
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

  public submit = () => {};
  public validate = () => {};
  public getFieldsState = () => {};

  public clearFields = (fieldKeys: FieldKey | FieldKey[]) => {};
}

export default FormStore;
