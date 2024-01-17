import * as Yup from 'yup'

const signupValidationSchema = Yup.object().shape({
    userName: Yup.string()
        .required("username is required")
        .min(4, "username should be atleast 4 chars minimum"),
    email: Yup.string()
        .email()
        .required("Email is required"),
        // using string for length validation
    phone: Yup.string()
        .min(10, 'Phone number should contain atleast 10 numbers'),
    password: Yup.string()
        .required("Password is required")
        .min(4, "Password should be at least 6 chars minimum")
        .matches(/[0-9]/, 'Password requires a number')
        .matches(/[a-z]/, 'Password requires a lowercase letter')
        .matches(/[A-Z]/, 'Password requires an uppercase letter')
});
export default signupValidationSchema;

