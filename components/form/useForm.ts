import { useRef } from 'react';

const getFormInstance = () => {};

const useForm = (form) => {
  const formRef = useRef(form);

  if (!formRef.current) {
    if (form) {
      formRef.current = form;
    } else {
      formRef.current = getFormInstance();
    }
  }

  return [formRef.current];
};

export default useForm;
