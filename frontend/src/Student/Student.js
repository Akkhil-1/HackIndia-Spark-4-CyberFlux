import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Input, DatePicker, Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import Header from '../AdminLandingPage/Header';
import Footer from '../AdminLandingPage/Footer';

const Student = () => {
  const { control, handleSubmit, trigger, formState: { errors } } = useForm();
  const [currentStep, setCurrentStep] = useState(0);
  
  const steps = [
    ["studentName", "address", "dob"], // Step 1 fields
    ["aadhaarCard", "addressProof", "tenthMarksheet"], // Step 2 fields
    ["twelfthMarksheet", "jeeMainsResult", "incomeCertificate"], // Step 3 fields
    ["domicileCertificate"], // Step 4 field
  ];

  const onFinish = (data) => {
    console.log('Form values:', data);
    // Handle final submission or process the values here
  };

  const handleNext = async () => {
    const valid = await trigger(steps[currentStep]);
    if (valid) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    setCurrentStep((prev) => prev - 1);
  };

  return (
    <>
      <Header />
      <div style={{
        padding: "40px",
        maxWidth: "800px",
        height: "80vh", // Adjusted height of the form component
        margin: "20px auto",
        backgroundColor: "white",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        borderRadius: "10px",
        overflow: "auto" // Ensure content is scrollable if it exceeds the height
      }}>
        <h2 style={{ textAlign: "center" }}>Student Registration Form</h2>
        <form onSubmit={handleSubmit(onFinish)}>
          {steps[currentStep].map((field, index) => {
            const isUploadField = ["aadhaarCard", "addressProof", "tenthMarksheet", "twelfthMarksheet", "jeeMainsResult", "incomeCertificate", "domicileCertificate"].includes(field);
            return (
              <div key={index} style={{ marginBottom: "20px", textAlign: 'center' }}>
                <label htmlFor={field} style={{ fontWeight: "bold", display: "block", marginBottom: "8px" }}>
                  {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
                </label>

                {isUploadField ? (
                  <Controller
                    name={field}
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <Upload
                        beforeUpload={(file) => {
                          onChange(file); // Save file object to the state
                          return false; // Prevent auto upload
                        }}
                        onRemove={() => onChange(null)} // Handle removal of file
                        fileList={value ? [value] : []}
                      >
                        <Button icon={<UploadOutlined />}>Click to Upload {field.replace(/([A-Z])/g, ' $1')}</Button>
                      </Upload>
                    )}
                  />
                ) : field === "dob" ? (
                  <Controller
                    name={field}
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <DatePicker 
                        style={{ width: '100%' }} 
                        onChange={(date, dateString) => onChange(dateString)} 
                      />
                    )}
                  />
                ) : (
                  <Controller
                    name={field}
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <Input {...{ onChange, onBlur, value }} placeholder={`Enter your ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`} />
                    )}
                  />
                )}
                {errors[field] && <span style={{ color: 'red', marginTop: "5px", display: "block" }}>This field is required</span>}
              </div>
            );
          })}

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: "20px" }}>
            {currentStep > 0 && (
              <Button onClick={handlePrev}>Previous</Button>
            )}
            {currentStep < steps.length - 1 ? (
              <Button type="primary" onClick={handleNext}>Next</Button>
            ) : (
              <Button type="primary" htmlType="submit">Submit</Button>
            )}
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Student;
