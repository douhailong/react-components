import React, { forwardRef } from 'react';
import clsx from 'clsx';

import './style/index.less';

import type { DividerProps } from './types';

const InternalDivider: React.ForwardRefRenderFunction<
  HTMLDivElement,
  DividerProps
> = (
  {
    children,
    className,
    direction = 'vertical',
    position = 'center',
    ...resrProps
  },
  ref
) => {
  const prefix = 'rc-' + 'divider';

  const classNames = clsx(
    prefix,
    `${prefix}-${direction}`,
    {
      [`${prefix}-with-text`]: children,
      [`${prefix}-with-text-${position}`]: children && position
    },
    className
  );

  return (
    <div>
      <span>aaa</span>
      <div role='divider' ref={ref} className={classNames} {...resrProps}>
        {children && direction === 'horizontal' ? (
          <span>{children}</span>
        ) : null}
      </div>
      <span>aaa</span>
    </div>
  );
};

const Divider = forwardRef<HTMLDivElement, DividerProps>(InternalDivider);

export default Divider;
export { DividerProps };
