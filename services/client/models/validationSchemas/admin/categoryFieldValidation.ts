import * as Yup from 'yup'

const categoryFieldValidationSchema = Yup.object().shape({
    categoryName: Yup.string()
        .required("category name is required")
        .min(4, "category name should contain atleast 4 chars"),
    inputFields: Yup.array().of(
        Yup.string().required("label is required for input field")
    ),
    checkBoxFields: Yup.array().of(
        Yup.object().shape({
            label: Yup.string().required("label is required for check box fields"),
            options: Yup.array()
                .of(Yup.string().notOneOf([null], 'Options cannot contain null values'))
                .min(2, "Options for the check box field should be at least two")
                .test(
                    'uniqueOptions',
                    'Options for the check box field should be unique',
                    (value: any) => {
                        const uniqueOptionsSet = new Set(value);
                        return uniqueOptionsSet.size === value.length;
                    }
                ),
        })
    ),    
    radioButtonFields: Yup.array().of(
        Yup.object().shape({
            label: Yup.string().required("label is required for radiobutton fields"),
            options: Yup.mixed().test(
                'isValidOptions',
                'At least two options should be provided for a radiobutton field',
                (value) => {
                    if (!value || !Array.isArray(value)) {
                        return false;
                    }
                    return value.length >= 2;
                }
            ),
        })
    )    
});

export default categoryFieldValidationSchema;