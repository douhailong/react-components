import { type ReactNode, Component } from 'react';
import { FormItemContext } from './context';
import { FieldError, FormItemContextProps, FormItemProps } from './types';

class Control<
  FormData = any,
  FieldValue = FormData[keyof FormData],
  FieldKey extends keyof any = keyof FormData
> extends Component {
  constructor(props) {
    super(props);
  }

  static defaultProps = {
    trigger: 'onChange',
    triggerPropName: 'value'
  };

  static isFormControl = true;

  static contextType = FormItemContext;

  context: FormItemContextProps<FormData, FieldValue, FieldKey>;

  private errors: FieldError<FieldValue> = null;

  private warings: ReactNode[] = null;

  private validateStatus: FormItemProps['validateStatus'];

  // 是否被用户操作过
  private touched: boolean;

  private isDestroyed = false;

  private childrenElement: ReactNode = null;

  private unregisterField: () => void;

  componentDidMount() {}

  componentDidUpdate() {}

  componentWillUnmount() {}

  isTouched() {
    return this.touched;
  }

  hasFieldProps() {
    return !!this.props.filed;
  }

  render() {
    return <div></div>;
  }
}

export default Control;
