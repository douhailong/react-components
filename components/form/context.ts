import { type Context, createContext } from 'react';
import type { FormContextProps } from './types';
import { NOOP } from '../_utils/constant';

export type FormContextType<
  FormData = any,
  FieldValue = FormData[keyof FormData],
  FieldKey extends keyof any = keyof FormData
> = Context<FormContextProps<FormData, FieldValue, FieldKey>>;

export const FormContext = createContext<FormContextProps>({
  layout: 'horizontal',
  labelCol: { span: 5, offset: 0 },
  labelAlign: 'right',
  wrapperCol: { span: 19, offset: 0 },
  store: {}
});

export const FormPrividerContext = createContext<{
  onFormValuesChange?: (id: string | undefined, changedValues) => void;
  onFormSubmit?: (id: string | undefined, values) => void;
}>({});

export const FormListContext = createContext<{
  getItemKey?: (key: unknown) => string;
}>({});
