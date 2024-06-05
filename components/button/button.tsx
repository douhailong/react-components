import { forwardRef } from 'react';
import type { ForwardRefRenderFunction, MouseEvent, ReactNode, Ref } from 'react';
import clsx from 'clsx';
import type { ButtonProps } from './types';
// import { isFragment } from '../_utils/react-dom';
import { sliceChildren } from './_utils';
import './style/index.less';

type ButtonRef = HTMLAnchorElement | HTMLButtonElement;

const InternalButton: ForwardRefRenderFunction<ButtonRef, ButtonProps> = (props, ref) => {
  const {
    type = 'default',
    shape,
    size,
    iconPosition = 'start',
    className,
    disabled,
    loading = false,
    ghost,
    block,
    danger,
    icon,
    children,
    href,
    onClick,
    htmlType,
    ...restProps
  } = props;

  const prefix = 'rc-btn';

  const cn = clsx(
    prefix,
    {
      [`${prefix}-${shape}`]: shape && shape !== 'default',
      [`${prefix}-${size}`]: size && size !== 'md',
      [`${prefix}-${type}`]: type,
      [`${prefix}-block`]: block,
      [`${prefix}-ghost`]: ghost,
      [`${prefix}-danger`]: danger,
      [`${prefix}-disabled`]: disabled
    },
    className
  );

  const handleClick = (e: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    if (loading) {
      return e.preventDefault();
    }
    onClick && onClick(e);
  };

  const kids = children || children === 0 ? sliceChildren(children, true) : null;

  const buttonInside = (iconNode: ReactNode, kidsNode: ReactNode) => {
    return iconPosition === 'start' ? (
      <>
        {iconNode}
        {kidsNode}
      </>
    ) : (
      <>
        {kidsNode}
        {iconNode}
      </>
    );
  };

  if (href !== undefined && href !== null) {
    return (
      <a
        ref={ref as Ref<HTMLAnchorElement>}
        onClick={handleClick}
        type={htmlType}
        href={disabled ? undefined : href}
        className={cn}
        {...restProps}
      >
        {buttonInside(icon, kids)}
      </a>
    );
  }

  return (
    <button
      ref={ref as Ref<HTMLButtonElement>}
      onClick={handleClick}
      type={htmlType}
      disabled={disabled}
      className={cn}
      {...restProps}
    >
      {buttonInside(icon, kids)}
    </button>
  );
};

const Button = forwardRef<ButtonRef, ButtonProps>(InternalButton);

export default Button;
