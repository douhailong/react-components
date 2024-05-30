import { isValidElement, Fragment } from 'react';

export const isFragment = (child: unknown) => {
  console.log(isValidElement(child));
  return isValidElement(child) && child.type === Fragment;
};
