import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form1 from '../forms/Form1';
import Form2 from '../forms/Form2';
import Form3 from '../forms/Form3';

const MultistepForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    emailId: '',
    password: '',
    firstName: '',
    lastName: '',
    address: '',
    countryCode: '+91',
    phoneNumber: '',
    acceptTermsAndCondition: false,
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState({});

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCheckboxChange = e => {
    const { name, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: checked,
    }));
  };

  const validateForm = () => {
    const {
      emailId,
      password,
      firstName,
      lastName,
      address,
      countryCode,
      phoneNumber,
      acceptTermsAndCondition,
    } = formData;
    const errors = {};

    switch (currentStep) {
      case 1:
        if (!emailId || !emailId.match(/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/)) {
          errors.emailId = 'Please enter a valid email ID';
        }

        if (
          !password ||
          !password.match(/^(?=.*[A-Z]{2})(?=.*[a-z]{2})(?=.*\d{2})(?=.*[@$!%*#?&]{2})/)
        ) {
          errors.password =
            'Password must contain at least 2 uppercase letters, 2 lowercase letters, 2 digits, and 2 special characters.';
        }
        break;

      case 2:
        if (!firstName || !firstName.match(/^[A-Za-z]{2,50}$/)) {
          errors.firstName = 'First name must contain only alphabets and be 2-50 characters long.';
        }

        if (lastName && !lastName.match(/^[A-Za-z]+$/)) {
          errors.lastName = 'Last name must contain only alphabets.';
        }

        if (!address || address.length < 10) {
          errors.address = 'Address must be at least 10 characters long.';
        }
        break;

      case 3:
        if (!countryCode || (countryCode !== '+91' && countryCode !== '+1')) {
          errors.countryCode = 'Please select a valid country code.';
        }

        if (!phoneNumber || !phoneNumber.match(/^\d{10}$/)) {
          errors.phoneNumber = 'Please enter a valid 10-digit phone number.';
        }

        if (!acceptTermsAndCondition) {
          errors.acceptTermsAndCondition = 'Please accept the terms and conditions.';
        }
        break;

      default:
        break;
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const { acceptTermsAndCondition, ...postData } = formData;

        fetch('https://codebuddy.review/submit', {
          method: 'POST',
          body: JSON.stringify({
            ...postData,
          }),
        })
          .then(res => res.json())
          .catch(err => console.log(err));

        navigate('posts');
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleNext = e => {
    e.preventDefault();
    if (validateForm()) {
      setCurrentStep(prevStep => prevStep + 1);
    }
  };

  const handleBack = e => {
    e.preventDefault();
    setCurrentStep(prevStep => prevStep - 1);
  };

  const renderForm = () => {
    switch (currentStep) {
      case 1:
        return <Form1 formData={formData} handleChange={handleChange} errors={errors} />;
      case 2:
        return <Form2 formData={formData} handleChange={handleChange} errors={errors} />;
      case 3:
        return (
          <Form3
            handleCheckboxChange={handleCheckboxChange}
            formData={formData}
            handleChange={handleChange}
            errors={errors}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="row bg-secondary" style={{ height: '100vh' }}>
      <div className="col-lg-6 col-sm-8 m-auto">
        <div className="bg-white rounded shadow-sm p-5 p-lg-15">
          <div className="text-center mb-10">
            <h2 className="text-dark mb-3">Form {currentStep}</h2>
          </div>
          <form>
            {renderForm()}

            <div className="d-flex flex-wrap justify-content-center pb-lg-0 mt-3">
              <div>
                <button
                  className="btn btn-lg btn-dark me-4"
                  type="button"
                  onClick={handleBack}
                  disabled={currentStep == 1}
                >
                  Back
                </button>
              </div>
              <div>
                <button
                  className="btn btn-lg btn-primary"
                  type="button"
                  onClick={currentStep == 3 ? handleSubmit : handleNext}
                >
                  {currentStep == 3 ? 'Save' : 'Save and Next'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MultistepForm;
