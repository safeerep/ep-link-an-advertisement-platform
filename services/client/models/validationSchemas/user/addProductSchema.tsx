import * as Yup from 'yup'

const addProductValidationSchema = Yup.object({
    categoryName: Yup.string().required('Please select a category'),
    productName: Yup.string().required('Product name is required'),
    description: Yup.string().required('Description is required'),
    price: Yup.number()
        .required('Price is required')
        .positive('Price must be a positive number'),
    images: Yup.array()
        .test(
            'at-least-four-images',
            'At least four images should be selected',
            (array: any) => {
                const nonNullValues = array.filter((element: any) => element !== null);
                return nonNullValues.length >= 4;
            }
        )
});

export default addProductValidationSchema;