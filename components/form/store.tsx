class FormStore<
  FormData = any,
  FieldValue = FormData[keyof FormData],
  FieldKey extends keyof any = keyof FormData
> {
  public getFieldsValue = () => {};
  public getFieldValue = (field: FieldKey): FieldValue => {};
  public getFieldError = () => {};
  public getFieldsError = () => {};
  public getTouchedFields = () => {};
  public getFields = () => {};
  public setFieldValue = () => {};
  public setFieldsValue = () => {};
  public setFields = () => {};
  public resetFields = () => {};
  public clearFields = () => {};
  public submit = () => {};
  public validate = () => {};
  public getFieldsState = () => {};
}

export default FormStore;
