import React, { forwardRef } from 'react';
import type { ForwardRefRenderFunction } from 'react';
import type { ButtonProps } from './types';

type ButtonRef = HTMLAnchorElement | HTMLButtonElement;

const InternalButton: ForwardRefRenderFunction<ButtonRef, ButtonProps> = (
  props,
  ref
) => {
  const {
    type,
    shape,
    size,
    className,
    disabled,
    loading,
    ghost,
    block,
    danger,
    icon,
    children,
    ...restProps
  } = props;

  const kids = children || children === 0 ? children : null;

  return <div></div>;
};

const Button = forwardRef<ButtonRef>(InternalButton);

export default Button;
