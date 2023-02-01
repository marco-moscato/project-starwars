// componente não está sendo utilizado.
import { useState } from 'react';

function useFormInput(initialValue) {
  const [value, setValue] = useState(initialValue);

  function handleChange(e) {
    setValue({ ...value, [e.target.name]: e.target.value });
  }
  return {
    name: value,
    onChange: handleChange,
  };
}

export default useFormInput;
