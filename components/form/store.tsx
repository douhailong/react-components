import { type ReactNode } from 'react';
import { get, has, omit } from 'lodash-es';
import Control from './control';
import { isArray, isFunction, isObject, isExist } from '../_utils/is';
import { cloneDeep, set } from './_utils';
import promisify from './promisify';
import { FormProps, FieldError, SubmitStatus } from './types';

export type NotifyType = 'setFieldValue' | 'reset' | 'innerSetValue';

export type InnerCallbackType = 'onValuesChange' | 'onSubmit' | 'onChange' | 'onSubmitFailed';

export type StoreChangeInfo<T> = {
  prev: any;
  field?: T | T[];
  isFormList?: boolean;
  ignore?: boolean;
  changeValues?: {
    [key in keyof any]: unknown;
  };
  data?: {
    errors?: FieldError;
    warnings?: React.ReactNode;
    touched?: boolean;
  };
};

export type DeepPartial<T> = T extends object
  ? {
      [K in keyof T]?: DeepPartial<T[K]>;
    }
  : T;

class Store<
  FormData = any,
  FieldValue = FormData[keyof FormData],
  FieldKey extends keyof any = keyof FormData
> {
  // 整个表单的提交状态 只有触发表单原生reset事件才会重置回init TODO from.reset还未实现
  private submitStatus: SubmitStatus = SubmitStatus.init;

  private registerFields: Control<FormData, FieldValue, FieldKey>[] = [];

  // 所有FormItem值变化
  private registerWatchers: (() => void)[] = [];

  // 所有FormItem内部状态变化 errors validating touched 状态变化
  private registerStateWatchers: (() => void)[] = [];

  // Form整体变动
  private registerFormWatchers: (() => void)[] = [];

  // 字段改动就会存储 只有reset才会重置
  private touchedFields: Record<string, unknown> = {};

  private store: Partial<FormData> = {};

  private initialValues: Partial<FormData> = {};

  private callbacks: Pick<FormProps<FormData, FieldValue, FieldKey>, InnerCallbackType> & {
    onValidateFailed?: (errors: { [key in FieldKey]: FieldError<FieldValue> }) => void;
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

  // 只要值改变就会执行
  private triggerValuesChange(value: Partial<FormData>) {
    if (value && Object.keys(value).length) {
      const { onValuesChange } = this.callbacks;
      onValuesChange && onValuesChange(value, this.getFields());
    }
    this.notifyWatchers();
  }

  // 必须是用户的操作才行 例如表单项input输入 而form.setFieldValue不行
  private triggerTouchChange(value: Partial<FormData>) {
    if (value && Object.keys(value).length) {
      const { onChange } = this.callbacks;
      onChange && onChange(value, this.getFields());
    }
  }

  private notify(type: NotifyType, info: StoreChangeInfo<FieldKey>) {
    if (type === 'setFieldValue' || (type === 'innerSetValue' && !info.ignore)) {
      1;
    }
    this.registerFields.forEach((field) => {
      field.onStoreChange && field.onStoreChange(type, { ...info, current: this.store });
    });
  }

  private getRegisteredFields() {
    return this.registerFields;
  }

  getRegisteredField(field?: FieldKey) {
    return this.registerFields.find((control) => control.props.field === field);
  }

  // 通知form状态更新 进行依赖收集
  innerCollectFormState() {
    this.notifyStateWatchers();
  }

  innerSetCallbacks(
    callbacks: Pick<FormProps<FormData, FieldValue, FieldKey>, InnerCallbackType> & {
      onValidateFailed?: (errors: { [key in FieldKey]: FieldError<FieldValue> }) => void;
    }
  ) {
    this.callbacks = callbacks;
  }

  registerWatcher(watcher: () => void) {
    this.registerWatchers.push(watcher);

    return () => {
      this.registerWatchers = this.registerWatchers.filter((x) => x !== watcher);
    };
  }

  registerStateWatcher(watcher: () => void) {
    this.registerStateWatchers.push(watcher);

    return () => {
      this.registerStateWatchers = this.registerStateWatchers.filter((x) => x !== watcher);
    };
  }

  registerFormWatcher(watcher: () => void) {
    this.registerFormWatchers.push(watcher);

    return () => {
      this.registerFormWatchers = this.registerFormWatchers.filter((x) => x !== watcher);
    };
  }

  // 收集所有control字段，并在组件卸载时移除
  registerField(field: Control<FormData, FieldValue, FieldKey>) {
    this.registerFields.push(field);
    this.notifyWatchers();

    return () => {
      this.registerFields = this.registerFields.filter((x) => x !== field);
      this.notifyWatchers();
    };
  }

  innerSetInitialValues(values: Partial<FormData>) {
    if (!values) return;
    this.initialValues = cloneDeep(values);

    Object.keys(values).forEach((field) => {
      set(this.store, field, values[field]);
    });
  }

  innerSetInitialValue(field: FieldKey, value: FieldValue) {
    if (!field) return;
    // TODO
  }

  // 会同时触发 onChange onValuesChange
  innerSetFieldValue(field: FieldKey, value: FieldValue) {
    if (!field) return;

    set(this.store, field, value);
    this.triggerValuesChange({ [field]: value } as unknown as Partial<FormData>);
    this.triggerTouchChange({ [field]: value } as unknown as Partial<FormData>);

    // TODO
  }

  innerGetStore() {
    return this.store;
  }

  // 注入组件的值都在这里取
  innerGetFieldValue(field: FieldKey) {
    return get(this.store, field);
  }

  innerGetStoreStatus() {
    return {
      submitStatus: this.submitStatus
    };
  }

  // /////////////

  getTouchedFields(): FieldKey[] {
    return this.getRegisteredFields(true)
      .filter((x) => x.isTouched())
      .map((x) => x.props.field);
  }

  // get 表单

  getFieldValue(fieldkey: FieldKey) {
    return cloneDeep(get(this.store, fieldkey));
  }

  getFields(): Partial<FormData> {
    return cloneDeep(this.store);
  }

  getFieldsValue(fieldKeys: FieldKey[]): Partial<FormData> {
    const values = {};

    if (isArray(fieldKeys)) {
      fieldKeys.forEach((key) => set(values, key, this.getFieldValue(key)));

      return values;
    }

    // TODO
  }

  getFieldError() {}

  getFieldsError() {}

  getFieldsState() {}

  // set 表单

  // 设置value error touch 信息
  setFields(args: {
    [K in FieldKey]?: {
      value?: FieldValue;
      error?: FieldError<FieldValue>;
      touched?: boolean;
      warning?: ReactNode;
    };
  }) {
    const fields = Object.keys(args) as FieldKey[];
    const changedValues = {};

    fields.forEach((field) => {
      const current = args[field];
      if (current) {
        const info = {};

        if ('error' in current) info.errors = current.error;
        if ('warning' in current) info.warnings = current.warning;
        if ('touched' in current) info.touched = current.touched;
        // if ('value' in current) info.errors = current.error;
      }
    });
  }

  setFieldValue() {}

  setFieldsValue() {}

  submit() {
    this.toggleSubmitStatus(SubmitStatus.submitting);

    this.validate(() => {
      const { onSubmit, onSubmitFailed } = this.callbacks;
    });
  }

  validate() {}

  toggleSubmitStatus(submitStatus: SubmitStatus) {
    this.submitStatus = submitStatus;
    this.innerCollectFormState();
    this.notifyFormWatchers();
  }

  resetFields(fieldKeys?: FieldKey | FieldKey[]) {
    const prevStore = cloneDeep(this.store);
    const fields = isExist(fieldKeys) && !isArray(fieldKeys) ? [fieldKeys] : fieldKeys;

    if (fields && isArray(fields)) {
      const changedValues: any = {};

      fields.forEach((field) => {
        set(this.store, field, this.initialValues[field as unknown as keyof FormData]);
        changedValues[field] = get(this.store, field);
      });

      this.triggerValuesChange(changedValues);

      // TODO
      // this.notify('reset', { prev, field: fields });
      // this._popTouchField(fields);
    }
  }

  clearFields() {}
}

export default Store;
