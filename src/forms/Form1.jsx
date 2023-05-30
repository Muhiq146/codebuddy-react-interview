import React from "react";
import Input from "../components/Input";

const Form1 = (props) => {
  const { formData, handleChange, errors } = props;
  return (
    <>
      <Input
        label="Email ID:"
        type="email"
        name="emailId"
        formData={formData}
        onChange={handleChange}
        errors={errors}
      />

      <Input
        label="Password:"
        type="password"
        name="password"
        formData={formData}
        onChange={handleChange}
        errors={errors}
      />
    </>
  );
};

export default Form1;
