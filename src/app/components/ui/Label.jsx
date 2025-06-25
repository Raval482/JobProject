import React from 'react';

const Label = ({ children, className = "", ...props }) => {
  return (
    <label className={`block mb-1 font-medium ${className}`} {...props}>
      {children}
    </label>
  );
};


export default Label;
