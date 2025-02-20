import { type Context, createContext } from "react";
import type { FormContextProps, FormItemContextProps, FormInstance } from "./types";
import { NOOP } from "../_utils/constant";

export type FormContextType<
  FormData = any,
  FieldValue = FormData[keyof FormData],
  FieldKey extends keyof any = keyof FormData,
> = Context<FormContextProps<FormData, FieldValue, FieldKey>>;

export const FormContext = createContext<FormContextProps>({
  layout: "horizontal",
  // labelCol: { span: 5, offset: 0 },
  labelAlign: "right",
  // wrapperCol: { span: 19, offset: 0 },
  requiredSymbol: true,
  getFormElementId: () => "1",
  store: {
    getFields: NOOP,
    getFieldsValue: NOOP,
    getFieldValue: NOOP,
    getFieldError: NOOP,
    getFieldsError: NOOP,
    getTouchedFields: NOOP,
    setFields: NOOP,
    setFieldsValue: NOOP,
    setFieldValue: NOOP,
    resetFields: NOOP,
    clearFields: NOOP,
    submit: NOOP,
    validate: NOOP,
    getFieldsState: NOOP,
    scrollToField: NOOP,
    getInnerMethods: () => ({
      registerField: NOOP,
      innerGetStore: NOOP,
      registerStateWatcher: NOOP,
      registerWatcher: NOOP,
      innerGetStoreStatus: NOOP,
    }),
  } as any,
});

export type FormItemContextType<
  FormData = any,
  FieldValue = FormData[keyof FormData],
  FieldKey extends keyof any = keyof FormData,
> = Context<FormItemContextProps<FormData, FieldValue, FieldKey>>;

export const FormItemContext = createContext<FormItemContextProps>({});

export const FormPrividerContext = createContext<{
  register?: (name: string, form: FormInstance) => void;
  onFormValuesChange?: (id: string | undefined, changedValues) => void;
  onFormSubmit?: (id: string | undefined, values) => void;
}>({});

export const FormListContext = createContext<{
  getItemKey?: (key) => string;
}>({});
