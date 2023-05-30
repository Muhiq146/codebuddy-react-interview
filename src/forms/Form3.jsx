import React from "react";
import Input from "../components/Input";

const Form3 = (props) => {
  const { handleCheckboxChange, formData, handleChange, errors } = props;

  return (
    <>
      <div>
        <label>Country Code:</label>
        <select
          name="countryCode"
          className="form-select form-select-solid p-2 cursor-pointer"
          value={formData.countryCode}
          onChange={handleChange}
          required
        >
          <option value="+91">India (+91)</option>
          <option value="+1">America (+1)</option>
        </select>
        {errors.countryCode && <p>{errors.countryCode}</p>}
      </div>
      <Input
        label="Phone Number:"
        name="phoneNumber"
        formData={formData}
        onChange={handleChange}
        errors={errors}
      />

      <div>
        <label>
          <input
            type="checkbox"
            name="acceptTermsAndCondition"
            checked={formData.acceptTermsAndCondition}
            onChange={handleCheckboxChange}
            required
          />{" "}
          Accept Terms and Conditions
        </label>
        {errors.acceptTermsAndCondition && <p>{errors.acceptTermsAndCondition}</p>}
      </div>
    </>
  );
};

export default Form3;
