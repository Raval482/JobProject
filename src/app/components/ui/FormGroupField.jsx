import React from 'react';
import Label from '../ui/Label';
import FormField from '../ui/FormField';

const FormGroupField = ({ data }) => {
  const { islabel, labelTitle, labelClass, ...inputProps } = data;

  return (
    <div className="mb-4">
      {islabel && <Label className={labelClass}>{labelTitle}</Label>}
      <FormField {...inputProps} />
    </div>
  );
};

export default FormGroupField;
