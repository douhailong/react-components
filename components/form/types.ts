import { FormHTMLAttributes, ReactNode } from 'react';
import FormStore from './store';

type FormStoreAttribute =
  | 'getFieldsValue'
  | 'getFieldValue'
  | 'getFieldError'
  | 'getFieldsError'
  | 'getTouchedFields'
  | 'getFields'
  | 'setFieldValue'
  | 'setFieldsValue'
  | 'setFields'
  | 'resetFields'
  | 'clearFields'
  | 'submit'
  | 'validate'
  | 'getFieldsState';

export type FormInstance<
  FormData = any,
  FieldValue = FormData[keyof FormData],
  FieldKey extends keyof any = keyof FormData
> = Pick<FormStore<FormData, FieldValue, FieldKey>, FormStoreAttribute> & {};

export type FormProps<
  FormData = any,
  FieldValue = FormData[keyof FormData],
  FieldKey extends keyof any = keyof FormData
> = Omit<FormHTMLAttributes<any>, 'onChange' | 'onSubmit'> & {
  /**
   * @zh Form实例
   */
  form?: FormInstance<FormData, FieldValue, FieldKey>;
  /**
   * @zh 表单布局 水平、垂直、多列
   * @default horizontal
   */
  layout?: 'horizontal' | 'vertical' | 'inline';
  /**
   * @zh 尺寸
   */
  size?: 'mini' | 'small' | 'default' | 'large';
  /**
   * @zh 标签文本的对齐方式
   */
  labelAlign?: 'left' | 'right';
  /**
   * @zh 整个表单是否禁用
   */
  disabled?: boolean;
  /**
   * @zh 标签后的冒号 优先级小于 `Form.Item` 的 `colon`
   */
  colon?: boolean | ReactNode;
  /**
   * @zh 表单默认值
   */
  initialValues?: Partial<FormData>;
  /**
   * @zh 表单值改变的回调 第一个参数是被改变表单项的值 第二个参数是所有表单项值 用户操作表单不会执行
   */
  onValuesChange?: (values: FormData) => void;
  /**
   * @zh 表单值改变的回调 只有用户操作表单才会执行
   */
  onChange?: (values: FormData) => void;
  /**
   * @zh 表达验证成功的回调
   */
  onSubmit?: (values: FormData) => void;
  /**
   * @zh 表单验证失败的回调
   */
  onSubmitFailed?: () => void;
};

export enum SubmitStatus {
  init = 'init',
  error = 'error',
  success = 'success',
  submitting = 'submitting'
}

type a = FormProps['className'];