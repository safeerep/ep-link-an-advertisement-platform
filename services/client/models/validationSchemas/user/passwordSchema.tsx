import * as Yup from 'yup'

const passwordValidationSchema = Yup.object().shape({
    password: Yup.string()
        .required("Password is required")
        .min(4, "Password should be at least 6 chars minimum")
        .matches(/[0-9]/, 'Password requires a number')
        .matches(/[a-z]/, 'Password requires a lowercase letter')
        .matches(/[A-Z]/, 'Password requires an uppercase letter'),
    confirmpassword: Yup.string()
        .oneOf([Yup.ref('password'), ''], 'Passwords must match')
        .required('Confirm Password is required'),
});
export default passwordValidationSchema;

