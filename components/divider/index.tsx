import React, { forwardRef } from 'react';
import clsx from 'clsx';

import type { DividerProps } from './types';

// import './style/index.less';

const InternalDivider: React.ForwardRefRenderFunction<
  HTMLDivElement,
  DividerProps
> = (
  {
    children = 1111111111111111,
    className,
    direction = 'horizontal',
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
      [`${prefix}-with-text-${position}`]: children
    },
    className
  );

  return (
    <div role='divider' ref={ref} className={classNames} {...resrProps}>
      {children && direction === 'horizontal' ? <span>{children}</span> : null}
    </div>
  );
};

const Divider = forwardRef<HTMLDivElement, DividerProps>(InternalDivider);

export default Divider;
export { DividerProps };
