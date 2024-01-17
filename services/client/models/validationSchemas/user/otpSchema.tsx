import * as Yup from 'yup';

const otpValidationSchema = Yup.object().shape({
    // here using string for length validation
    otp: Yup.string()  
    .required("OTP is required")
    .matches(/^[0-9]{4}$/, "OTP should be exactly 4 digits")
});

export default otpValidationSchema;
