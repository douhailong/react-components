import React, {
  type ForwardRefExoticComponent,
  type PropsWithChildren,
  useCallback,
  useRef,
  forwardRef
} from 'react';
import { FormInstance } from './types';

const InternalFormProvider = () => {};

const FormProvider = forwardRef(InternalFormProvider);

FormProvider.displayName = 'FormProvider';
