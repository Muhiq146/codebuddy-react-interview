import React from "react";
import Input from "../components/Input";

const Form2 = (props) => {
  const { formData, handleChange, errors } = props;

  return (
    <>
      <Input
        label="First Name:"
        name="firstName"
        formData={formData}
        onChange={handleChange}
        errors={errors}
      />
      <Input
        label="Last Name:"
        name="lastName"
        formData={formData}
        onChange={handleChange}
        errors={errors}
      />
      <Input
        label="Address:"
        name="address"
        formData={formData}
        onChange={handleChange}
        errors={errors}
      />
    </>
  );
};

export default Form2;
