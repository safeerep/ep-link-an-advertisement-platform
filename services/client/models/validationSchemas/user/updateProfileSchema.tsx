import * as Yup from 'yup'

const updateProfileSchema = Yup.object().shape({
    userName: Yup.string()
        .required("username is required")
        .min(4, "username should be atleast 4 chars minimum"),
    phone: Yup.string()
        .min(10, 'Phone number should contain atleast 10 numbers'),
});
export default updateProfileSchema;

