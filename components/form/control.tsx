import { Component, ReactNode } from 'react';

class Control<
  FormData = any,
  FieldValue = FormData[keyof FormData],
  FieldKey extends keyof any = keyof FormData
> extends Component {
  private touched = false;

  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  componentDidUpdate() {}

  componentWillUnmount() {}

  isTouched() {
    return this.touched;
  }

  render() {
    return <div></div>;
  }
}

export default Control;
