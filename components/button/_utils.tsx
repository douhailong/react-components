import { type ReactNode, type ReactElement, isValidElement, cloneElement, Children } from 'react';
import { isString, isNumber } from '../_utils/is';
import { isFragment } from '../_utils/react-dom';

// 匹配内容为两个汉字的字符串
const twoCnReg = /^[\u4e00-\u9fa5]{2}$/;
export const isTowCN = twoCnReg.test.bind(twoCnReg);

const sliceTwoCn = (child: ReactElement, needInsert: boolean) => {
  if (child === null || child === undefined) return;

  const space = needInsert ? ' ' : '';
  // 直接调用isValidElement会导致child类型不匹配
  const validElement = () => isValidElement(child);

  if (isString(child)) {
    return <span>{isTowCN(child) ? child.split('').join(space) : child}</span>;
  }

  if (validElement() && isTowCN(child.props.children)) {
    return cloneElement(child, { children: child.props.children.split('').join(space) });
  }

  if (isFragment(child)) {
    return <span>{child}</span>;
  }

  return child;
};

export const sliceChildren = (children: ReactNode, needInsert: boolean) => {
  const childs: ReactNode[] = [];
  let prevSimple = false;

  // 合并string or number [1, 2, 3, 4]
  Children.forEach(children, (child) => {
    const currentSimple = isString(child) || isNumber(child);

    if (prevSimple && currentSimple) {
      childs[childs.length - 1] = `${childs[childs.length - 1]}${child}`;
    } else {
      childs.push(child);
    }
    prevSimple = currentSimple;
  });

  return Children.map(childs, (child) => sliceTwoCn(child, needInsert));
};
