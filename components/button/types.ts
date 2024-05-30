import type { ButtonHTMLAttributes, ReactNode } from 'react';

export type ButtonType = 'default' | 'primary' | 'dashed' | 'link' | 'text';
export type ButtonShape = 'default' | 'circle' | 'round';
export type ButtonSize = 'lg' | 'md' | 'sm';
export type IconPosition = 'start' | 'end';
export type ButtonHtmlType = ButtonHTMLAttributes<HTMLButtonElement>['type'];
export type BaseButtonProps = {
  type?: ButtonType;
  shape?: ButtonShape;
  size?: ButtonSize;
  iconPosition: IconPosition;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  ghost?: boolean;
  danger?: boolean;
  block?: boolean;
  icon?: ReactNode;
  children?: ReactNode;
};

export type ButtonProps = Partial<
  Omit<ButtonHTMLAttributes<HTMLButtonElement | HTMLAnchorElement>, 'type'> &
    BaseButtonProps & {
      href?: string;
      target?: string;
      htmlType: ButtonHtmlType;
    }
>;
