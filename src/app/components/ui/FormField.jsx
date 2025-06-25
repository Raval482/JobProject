import React from 'react';

const FormField = ({ type = "text", className = "", ...props }) => {
  return (
    <input
      type={type}
      className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      {...props}
    />
  );
};

export default FormField;
