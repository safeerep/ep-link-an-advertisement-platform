import * as Yup from 'yup'

const productValidationSchema = Yup.object().shape({
  categoryName: Yup.string().required('Category name is required'),
  productName: Yup.string().required('Product name is required'),
  description: Yup.string().required('Description is required'),
  price: Yup.number().required('Price is required'),
  images: Yup.array()
    .of(Yup.string().nullable())
    .min(4, 'At least four images should be selected'),
  location: Yup.string().required('location is not included in the data submitted')
});

export default productValidationSchema;