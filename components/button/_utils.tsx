import { type ReactNode, isValidElement, cloneElement, Children } from 'react';
import { isString, isNumber } from '../_utils/is';
import { isFragment } from '../_utils/react-dom';

// 匹配内容为两个汉字的字符串
const twoCnReg = /^[\u4e00-\u9fa5]{2}$/;
export const isTowCN = twoCnReg.test.bind(twoCnReg);

const sliceTwoCn = (child: ReactNode, needInsert: boolean) => {
  if (child === null || child === undefined) return;

  const space = needInsert ? ' ' : '';

  if (isString(child)) {
    return <span>{isTowCN(child) ? child.split('').join(space) : child}</span>;
  }

  if (isFragment(child)) {
    return <span>{child}</span>;
  }

  if (isValidElement(child) && isTowCN(child.props.children)) {
    return cloneElement(child, {
      children: child.props.children.split('').join(space)
    });
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
