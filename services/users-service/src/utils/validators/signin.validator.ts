import * as Yup from 'yup'

const signinValidationSchema = Yup.object().shape({
    email: Yup.string()
        .email()
        .required("Email is required"),
    password: Yup.string()
        .required("Password is required")
        .min(4, "Password should be at least 6 chars minimum")
        .matches(/[0-9]/, 'Password requires a number')
        .matches(/[a-z]/, 'Password requires a lowercase letter')
        .matches(/[A-Z]/, 'Password requires an uppercase letter')
});
export default signinValidationSchema;

