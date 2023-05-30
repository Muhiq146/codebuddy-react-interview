import React from "react";

const Input = ({ label, type = "text", name, formData, onChange, required = true, errors }) => {
  return (
    <div>
      <label className="form-label">{label}</label>
      <input
        className="form-control"
        type={type}
        name={name}
        value={formData[name]}
        onChange={onChange}
        required={required}
      />
      {errors[name] && (
        <div className="fv-plugins-message-container text-danger">
          <div className="fv-help-block">
            <span role="alert">{errors[name]}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Input;
