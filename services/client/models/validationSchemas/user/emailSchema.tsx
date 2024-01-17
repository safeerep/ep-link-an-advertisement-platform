import * as Yup from 'yup'

const emailValidationSchema = Yup.object().shape({
    email: Yup.string()
        .email("Please type a valid email")
        .required("Email is required"),
});
export default emailValidationSchema;

