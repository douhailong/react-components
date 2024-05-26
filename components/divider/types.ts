import { CSSProperties, ReactNode } from 'react';

export type DividerProps = {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  /**
   * @zh 分割线的方向
   * @defaultValue horizontal
   */
  direction?: 'horizontal' | 'vertical';
  /**
   * @zh 文字位置
   * @defaultValue center
   */
  position?: 'left' | 'right' | 'center';
};
