import type {
  FormHTMLAttributes,
  ReactNode,
  CSSProperties,
  ReactElement,
  HTMLAttributes,
  ComponentType as ReactComponentType,
} from "react";
import type { Options as ScrollIntoOptions } from "scroll-into-view-if-needed";
import type { ValidateMessagesTemplateType } from "b-validate";
import type Store from "./store";
import type { InnerMethodsKey } from "./useForm";

// JSX.IntrinsicElements html标签名 ReactComponentType 类组件或函数组件
export type ComponentType = keyof JSX.IntrinsicElements | ReactComponentType;

export type StringKeyMap = { [K: string]: any };

type StoreAttributes =
  | "getFieldsValue"
  | "getFieldValue"
  | "getFieldError"
  | "getFieldsError"
  | "getTouchedFields"
  | "getFields"
  | "setFieldValue"
  | "setFieldsValue"
  | "setFields"
  | "resetFields"
  | "clearFields"
  | "submit"
  | "validate"
  | "getFieldsState";

export type FieldError<FieldValue = any> = {
  value?: FieldValue;
  message?: ReactNode;
  type?: string;
  requiredError?: boolean;
};

export type ValidateFieldsErrors<FieldValue = any, FieldKey extends keyof any = string> =
  | Record<FieldKey, FieldValue>
  | undefined
  | null;

// TODO labelCol wrapperCol
export type FormProps<
  FormData = any,
  FieldValue = FormData[keyof FormData],
  FieldKey extends keyof any = keyof FormData,
> = Omit<FormHTMLAttributes<any>, "className" | "onChange" | "onSubmit"> & {
  style?: CSSProperties;
  className?: string | string[];
  prefixCls?: string;
  /**
   * @zh form实例
   */
  form?: FormInstance<FormData, FieldValue, FieldKey>;
  /**
   * @zh 表单控件id的前缀
   */
  id?: string;
  /**
   * @zh 表单布局 水平、垂直、多列
   * @default horizontal
   */
  layout?: "horizontal" | "vertical" | "inline";
  /**
   * @zh 尺寸
   */
  size?: "mini" | "small" | "default" | "large";
  /**
   * @zh required字段显示星号
   */
  requiredSymbol?: boolean | { position: "start" | "end" };
  /**
   * @zh 标签文本的对齐方式
   */
  labelAlign?: "left" | "right";
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
   * @zh 触发验证的的时机
   * @default onChange
   */
  validateTrigger?: string | string[];
  /**
   * @zh 表单值改变的回调
   */
  onValuesChange?: (value: Partial<FormData>, values: Partial<FormData>) => void;
  /**
   * @zh 表单值改变的回调 只有用户操作表单才会执行 例如fom.setFieldValue时onValuesChange会执行而onChange不会执行
   */
  onChange?: (value: Partial<FormData>, values: Partial<FormData>) => void;
  /**
   * @zh 最外层标签
   */
  wrapper?: ComponentType;
  /**
   * @zh 最外层标签props
   */
  wrapperProps?: StringKeyMap;
  /**
   * @zh 验证失败后滚动到第一个错误字段
   */
  scrollToFirstError?: boolean | ScrollIntoOptions;
  /**
   * @zh
   */
  validateMessages?: Partial<{
    [K in keyof ValidateMessagesTemplateType]: ValidateMessagesTemplateType[K] extends string
      ? ValidateMessagesTemplateType[K] | ((data, { label }) => any)
      : Partial<Record<keyof ValidateMessagesTemplateType[K], string | ((data, { label }) => any)>>;
  }>;
  /**
   * @zh 表达验证成功的回调
   */
  onSubmit?: (values: FormData) => void;
  /**
   * @zh 表单验证失败的回调
   */
  onSubmitFailed?: (errors: Record<string, FieldError>) => void;
};

export type FormInstance<
  FormData = any,
  FieldValue = FormData[keyof FormData],
  FieldKey extends keyof any = keyof FormData,
> = Pick<Store<FormData, FieldValue, FieldKey>, StoreAttributes> & {
  scrollToField: (fieldKey: FieldKey, options?: ScrollIntoOptions) => void;
  getInnerMethods: (isInner?: boolean) => InnerMethods<FormData, FieldValue, FieldKey>;
};

export type FormItemProps<
  FormData = any,
  FieldValue = FormData[keyof FormData],
  FieldKey extends keyof any = keyof FormData,
> = Omit<HTMLAttributes<any>, "className" | "children"> & {
  style?: CSSProperties;
  className?: string | string[];
  prefixCls?: string;
  store?: FormInstance<FormData, FieldValue, FieldKey>;
  /**
   * @zh 初始值
   */
  initialValue?: FieldValue;
  /**
   * @zh 唯一标识
   */
  field?: FieldKey;
  /**
   * @zh 标签文本
   */
  label?: ReactNode;

  // TODO labelCol?: ColProps; wrapperCol?: ColProps;

  colon?: boolean | ReactNode;

  disabled?: boolean;

  rules?: RulesProps<FieldValue>[];
};

export type FormItemChildrenFn<
  FormData = any,
  FieldValue = FormData[keyof FormData],
  FieldKey extends keyof any = keyof FormData,
> = (formData: any, form: FormInstance<FormData, FieldValue, FieldKey>) => ReactNode;

export type FormControlProps<
  FormData = any,
  FieldValue = FormData[keyof FormData],
  FieldKey extends keyof any = keyof FormData,
> = {};

export type FormListProps = {};

export type FormItemContextProps<
  FormData = any,
  FieldValue = FormData[keyof FormData],
  FieldKey extends keyof any = keyof FormData,
> = FormContextProps<FormData, FieldValue, FieldKey> & {
  updateFormItem?: (
    field: string,
    params: { errors?: FieldError<FieldValue>; warnings?: ReactNode[] },
  ) => void;
};

export type InnerMethods<
  FormData = any,
  FieldValue = FormData[keyof FormData],
  FieldKey extends keyof any = keyof FormData,
> = Pick<Store<FormData, FieldValue, FieldKey>, InnerMethodsKey>;

export type ValidateOptions = {
  validateOnly?: boolean;
};
export type FormValidateFn = {};
export type FormProviderProps = {};

export type FieldState<FormValue = any> = {
  errors: FieldError<FormValue>[];
  warnings: ReactNode[];
  validateStatus: FormItemProps["validateStatus"] | undefined;
  isSubmitted: boolean;
  isTouched: boolean;
};

export type FormContextProps<
  FormData = any,
  FieldValue = FormData[keyof FormData],
  FieldKey extends keyof any = keyof FormData,
> = Pick<
  FormProps<FormData, FieldValue, FieldKey>,
  | "prefixCls"
  // | 'labelCol'
  // | 'wrapperCol'
  | "requiredSymbol"
  | "labelAlign"
  | "disabled"
  | "colon"
  | "layout"
  | "validateTrigger"
> & {
  validateMessages?: FormProps["validateMessages"];
  getFormElementId?: (field: FieldKey) => string;
  store?: FormInstance<FormData, FieldValue, FieldKey>;
};

export type RulesProps<FieldValue = any> = {
  trigger?: string | string[];
  /**
   * 验证失败警示等级 warning不会阻塞表单提交
   */
  level?: "error" | "warning";
  required?: boolean;
  type?: string;
  length?: number;
  // Array
  maxLength?: number;
  minLength?: number;
  includes?: boolean;
  deepEqual?: any;
  empty?: boolean;
  // Number
  min?: number;
  max?: number;
  equal?: number;
  positive?: boolean;
  negative?: boolean;
  // Object
  hasKeys?: string[];
  // String
  match?: RegExp;
  uppercase?: boolean;
  lowercase?: boolean;
  // Boolean
  true?: boolean;
  false?: boolean;
  // custom
  validator?: (value: FieldValue | undefined, callback: (error?: ReactNode) => void) => void;
  message?: ReactNode;
};

export enum SubmitStatus {
  init = "init",
  error = "error",
  success = "success",
  submitting = "submitting",
}

export enum ValidateStatus {
  error = "error",
  success = "success",
  warning = "warning",
  validating = "validating",
}
