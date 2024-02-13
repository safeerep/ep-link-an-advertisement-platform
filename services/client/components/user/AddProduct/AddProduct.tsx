import {
    addProduct,
    authRequired,
    checkCurrentUserAddedProducts,
    getAllCategories
} from '@/store/actions/userActions/userActions'
import React, { useState, ChangeEvent, useEffect } from 'react'
import { Country, State, City } from 'country-state-city'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { Toaster } from 'react-hot-toast'
import addProductValidationSchema from '@/models/validationSchemas/user/addProductSchema'
import PolicyAdvertisementModal from '@/components/Modals/PolicyAdvertisement'
import { RootState } from '@/store/store'

const AddProduct = () => {
    let imagesArray = new Array(8).fill(null)
    const [imageUrls, setImageUrls] = useState<Array<string | null>>(imagesArray);
    const [imageFiles, setImageFiles] = useState(Array(8).fill(null));
    const [currentCategory, setCurrentCategory] = useState<any>(null);
    const [selectedOptions, setSelectedOptions] = useState<Record<number, any>>({});
    const [selectedOptionsInRadioButton, setSlectedOptionsInRadioButton] = useState<Record<string, any>>({});
    const [categoryNameError, setCategoryNameError] = useState<any>(null);
    const [productNameError, setProductNameError] = useState<any>(null);
    const [priceError, setPriceError] = useState<any>(null);
    const [descriptionError, setDescriptionError] = useState<any>(null);
    const [imagesError, setImagesError] = useState<any>(null);
    const [countryError, setCountryError] = useState<any>(null);
    const [stateError, setStateError] = useState<any>(null);
    const [cityError, setCityError] = useState<any>(null);
    const countries = Country.getAllCountries()
    let [selectedCountry, setSelectedCountry] = useState('');
    let [states, setStates] = useState<any[]>([]);
    let [selectedState, setSelectedState] = useState('');
    let [cities, setCities] = useState<any[]>([]);
    let [selectedCity, setSelectedCity] = useState('');
    const [advertisementModalOpen, setAdvertisementModalOpen] = useState<boolean>(false);

    const dispatch: any = useDispatch()
    const router = useRouter();
    useEffect(() => {
        dispatch(authRequired(router))
        dispatch(getAllCategories())
    }, [])

    const user = useSelector((state: RootState) => state?.user?.data?.userData)
    const userId: string = String(user?._id);
    useEffect(() => {
        const checkCount = async () => {

            if (!user?.premiumMember) {
                const response: any = await dispatch(checkCurrentUserAddedProducts())

                if (response?.payload > 3) {
                    setAdvertisementModalOpen(true)
                }
            }
        }
        checkCount();
    }, [userId])

    const categories = useSelector((state: RootState) => state?.user?.data?.categories)
    console.log(categories);
    console.log(currentCategory);

    const handleCategoryChange = (categoryName: string) => {
        const selectedCategory = categories
            .find((category: any) => category.categoryName === categoryName);
        setCurrentCategory(selectedCategory)
    }

    const handleImageChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);

            setImageUrls((prevImageUrls) => {
                const newImageUrls = [...prevImageUrls];
                newImageUrls[index] = imageUrl;
                return newImageUrls;
            });

            setImageFiles((prevImageFiles) => {
                const newImageFiles = [...prevImageFiles];
                newImageFiles[index] = file;
                return newImageFiles;
            });
        }
    };

    const handleRadioChange = (fieldIndex: number, optionIndex: any) => {
        setSelectedOptions((prevState) => ({
            ...prevState,
            [fieldIndex]: optionIndex,
        }));
        setSlectedOptionsInRadioButton((prevState) => ({
            ...prevState,
            [currentCategory?.radioButtonFields[fieldIndex]?.label]: currentCategory?.radioButtonFields[fieldIndex]?.options[optionIndex],
        }));
    };

    const handleCountrySelect = (countryName: string) => {
        const selectedCountry = countries.filter((country) => {
            return countryName === country.name;
        })
        
        const statesInCountry = State.getStatesOfCountry(selectedCountry[0].isoCode);
        setStates(statesInCountry)
    };
    const handleSelectState = (stateName: string) => {
        const selectedState = states.filter((state) => {
            return stateName === state.name;
        })

        const cities = City.getCitiesOfState(selectedState[0].countryCode, selectedState[0].isoCode);
        setCities(cities);
    };

    const handleFormSubmit = async (values: any) => {

        setProductNameError(null)
        setDescriptionError(null)
        setCategoryNameError(null)
        setPriceError(null)
        setImagesError(null)
        setCountryError(null)
        setStateError(null)
        setCityError(null)
        try {
            const {
                categoryName,
                productName,
                description,
                price,
                checkboxes,
                ...inputFields
            } = values;

            // creating an object to validate;
            const filteredImageUrls = imageUrls.filter(url => url !== null);
            const filteredImageFiles = imageFiles.filter((file) => file !== null);
            const productObj = {
                categoryName: currentCategory?.categoryName || '',
                productName,
                description,
                price: Number(price) || null,
                images: filteredImageFiles,
                country: selectedCountry,
                state: selectedState,
                city: selectedCity
            };

            await addProductValidationSchema.validate(productObj, { abortEarly: false });

            // Validation passed, if validation is being failed, we will get into catch block
            console.log('Validation passed')

            const checkBoxes: any = {};
            if (values?.checkboxes) {
                const fieldNameWithValue = Object.keys(values?.checkboxes)
                fieldNameWithValue.forEach((field) => {
                    const parts: string[] = field.split('_')
                    const key: string = parts[0]?.trim()
                    const value: string = parts[1]?.trim()
                    if (checkBoxes[key]) {
                        checkBoxes[key].push(value)
                    } else {
                        checkBoxes[key] = [value]
                    }
                })
            }

            const productDetails = {
                ...productObj,
                inputFields: { ...inputFields },
                checkBoxes: { ...checkBoxes },
                radioButtons: { ...selectedOptionsInRadioButton },
                location: `${selectedCountry}, ${selectedState}, ${selectedCity}`
            };
            console.log(`yes its final`, productDetails);
            dispatch(addProduct({ productDetails, router }))

        } catch (err: any) {
            // Validation failed, so we will handle the errors here;
            if (err.inner && err.inner.length > 0) {
                // Yup validation errors contain an `inner` array with individual errors
                const fieldErrors = err.inner.reduce((errors: Record<string, string>, error: any) => {
                    errors[error.path] = error.message;
                    return errors;
                }, {});

                console.log('Field-specific errors:', fieldErrors);
                if (fieldErrors?.productName) setProductNameError(fieldErrors?.productName)
                if (fieldErrors?.description) setDescriptionError(fieldErrors?.description)
                if (fieldErrors?.categoryName) setCategoryNameError(fieldErrors?.categoryName)
                if (fieldErrors?.price) setPriceError(fieldErrors?.price)
                if (fieldErrors?.images) setImagesError(fieldErrors?.images)
                if (fieldErrors?.country) setCountryError(fieldErrors?.country)
                if (fieldErrors?.state) setStateError(fieldErrors?.state)
                if (fieldErrors?.city) setCityError(fieldErrors?.city)
            } else {
                console.log('Validation error:', err);
            }
        }
    }

    return (
        <>
            <PolicyAdvertisementModal
                isModalOpen={advertisementModalOpen}
                setModalOpen={setAdvertisementModalOpen}
            />
            <div className="w-full justify-between px-12 lg:px-28 bg-slate-50 mt-2 min-h-screen">
                <Formik
                    initialValues={{
                        categoryName: '',
                        productName: '',
                        price: '',
                        description: '',
                        checkboxes: {},
                    }}
                    onSubmit={(values: any) => {
                        console.log(`submitted with`, values);
                        console.log(`submitted with`, selectedCountry);
                        console.log(`submitted with`, selectedState);
                        console.log(`submitted with`, selectedCity);
                        
                        handleFormSubmit(values)
                    }}
                >
                    <Form>
                        <div className="flex">
                            <div className="sm:w-full md:w-1/2 lg:w-1/2 px-2">
                                <div>
                                    <label htmlFor="CategoryName" className="text-md font-semibold text-gray-600">Select category:</label>
                                    <Field
                                        name="CategoryName"
                                        className="p-2 border mt-1 w-full rounded-md bg-light"
                                        as="select"
                                        defaultValue=''
                                        onChange={(e: any) => handleCategoryChange(e.target.value)}
                                    >
                                        <option value={''} disabled>Select a category</option>
                                        {categories?.length > 0 &&
                                            categories.map((category: any) => (
                                                <option key={category.categoryName}
                                                    value={category.categoryName}>
                                                    {category.categoryName}
                                                </option>
                                            ))
                                        }
                                    </Field>
                                </div>
                                {categoryNameError && <div className='text-red-600'>{categoryNameError}</div>}
                            </div>
                            <div className="sm:w-full lg:w-1/2 px-2">
                                <div>
                                    <label htmlFor="productName" className="block text-md font-semibold text-gray-600">Product name:</label>
                                    <Field
                                        type="text"
                                        name="productName"
                                        className="p-2 border mt-1 block w-full rounded-md bg-light"
                                        placeholder="Type product name here"
                                    />
                                </div>
                                {productNameError && <div className='text-red-600'>{productNameError}</div>}
                            </div>
                        </div>
                        <div className="w-full px-2">
                            <div>
                                <label htmlFor="description" className="block text-md font-semibold text-gray-600">Write Description:</label>
                                <Field
                                    type="text"
                                    name="description"
                                    className="p-2 border mt-1 block w-full rounded-md bg-light"
                                    placeholder="Type a description for your product"
                                />
                            </div>
                            {descriptionError && <div className='text-red-600'>{descriptionError}</div>}
                        </div>
                        <div className="sm:w-full lg:w-1/2 px-2">
                            <div>
                                <label htmlFor="Price" className="block text-md font-semibold text-gray-600">Price:</label>
                                <Field
                                    type="number"
                                    name="price"
                                    className="p-2 border mt-1 block w-full rounded-md bg-light"
                                    placeholder="Enter price of the product"
                                />
                            </div>
                            {priceError && <div className='text-red-600'>{priceError}</div>}
                        </div>
                        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 w-full gap-4 px-2">
                            <div>
                                <label htmlFor="country" className="block text-md font-semibold text-gray-600">Country</label>
                                <Field
                                    name="country"
                                    className="p-2 border  w-full rounded-md bg-light"
                                    as="select"
                                    defaultValue=''
                                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                        const currentlySelectedCountry = e.target.value;
                                        setSelectedCountry(currentlySelectedCountry);
                                        handleCountrySelect(currentlySelectedCountry);
                                    }}
                                >
                                    <option value={''} disabled>Select your country</option>
                                    {countries?.length > 0 &&
                                        countries.map((country: any) => (
                                            <option key={country.name}
                                                value={country.name}>
                                                {country.name}
                                            </option>
                                        ))
                                    }
                                </Field>
                                {countryError && <div className='text-red-600'>{countryError}</div>}
                            </div>
                            <div>
                                <label htmlFor="state" className="block text-md font-semibold text-gray-600">State</label>
                                <Field
                                    name="state"
                                    className="p-2 border  w-full rounded-md bg-light"
                                    as="select"
                                    defaultValue=''
                                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                        const currentlyselectedState = e.target.value;
                                        setSelectedState(currentlyselectedState)
                                        handleSelectState(currentlyselectedState)
                                    }}
                                >
                                    <option value={''} disabled>Select your state</option>
                                    {states?.length > 0 &&
                                        states.map((state: any) => (
                                            <option key={state.name}
                                                value={state.name}>
                                                {state.name}
                                            </option>
                                        ))
                                    }
                                </Field>
                                {stateError && <div className='text-red-600'>{stateError}</div>}
                            </div>
                            <div>
                                <label htmlFor="city" className="block text-md font-semibold text-gray-600">Nearest City</label>
                                <Field
                                    name="city"
                                    className="p-2 border  w-full rounded-md bg-light"
                                    as="select"
                                    defaultValue=''
                                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                        const currentlyselectedCity = e.target.value;
                                        setSelectedCity(currentlyselectedCity)
                                    }}
                                >
                                    <option value={''} disabled>Select your nearest city</option>
                                    {cities?.length > 0 &&
                                        cities.map((city: any) => (
                                            <option key={city.name}
                                                value={city.name}>
                                                {city.name}
                                            </option>
                                        ))
                                    }
                                </Field>
                                { cityError && <div className='text-red-600'>{cityError}</div>}
                            </div>
                        </div>
                        {/* dynamic fields starting */}
                        {currentCategory && currentCategory?.inputFields?.length &&
                            currentCategory?.inputFields?.map((label: string) =>
                            (
                                <div key={label} className="w-full md:w-1/2 lg:w-1/2 px-2">
                                    <label htmlFor={label} className="block text-md font-semibold text-gray-600">{label}</label>
                                    <Field
                                        type="text"
                                        name={label}
                                        className="p-2 border mt-1 block w-full rounded-md bg-light"
                                    />
                                </div>
                            )
                            )
                        }
                        {currentCategory?.checkBoxFields?.length > 0 &&
                            currentCategory?.checkBoxFields?.map((document: any, index: number) =>
                            (
                                <div key={index} className="sm:w-full lg:w-1/2 px-2">
                                    <label htmlFor={document?.label} className="block text-md font-semibold text-gray-600">{document?.label}</label>
                                    {
                                        document?.options?.map((option: string, optionIndex: number) => (
                                            <div key={optionIndex} className="flex items-center">
                                                <Field
                                                    type="checkbox"
                                                    name={`checkboxes.${document?.label}_${option}`}
                                                    className='mr-2' />
                                                <label htmlFor="">{option}</label>
                                            </div>
                                        ))
                                    }
                                </div>
                            )
                            )
                        }
                        {currentCategory?.radioButtonFields?.length > 0 &&
                            currentCategory?.radioButtonFields?.map((document: any, fieldIndex: number) => (
                                <div key={fieldIndex} className="sm:w-full md:w-1/2 lg:w-1/2 px-2">
                                    <label htmlFor={document?.label} className="block text-md font-semibold text-gray-600">
                                        {document?.label}
                                    </label>
                                    {document?.options?.map((option: string, optionIndex: number) => (
                                        <div key={optionIndex} className="flex items-center">
                                            <Field
                                                type="radio"
                                                name={`radioButtons.${document?.label}`}
                                                id={`radio_${fieldIndex}_${optionIndex}`}
                                                className="mr-2"
                                                checked={selectedOptions[fieldIndex] === optionIndex}
                                                onChange={() => handleRadioChange(fieldIndex, optionIndex)}
                                            />
                                            <label htmlFor={`radio_${fieldIndex}_${optionIndex}`}>{option}</label>
                                        </div>
                                    ))}
                                </div>
                            ))}

                        {/* dynamic fields ending */}
                        <h1 className='text-xl block p-4'> Add your product' images</h1>
                        {imagesError && <div className='text-red-600 px-4'>{imagesError}</div>}
                        <div className="flex justify-center mt-4 flex-wrap">
                            <ErrorMessage name="images" component="div" className="error-message" />
                            {imagesArray.map((_, index) => (
                                <label key={index} className="relative p-4">
                                    <input
                                        type="file"
                                        name={`images.${index}`}
                                        accept="image/*"
                                        className="hidden"
                                        onChange={(e) => handleImageChange(index, e)}
                                    />
                                    <div className="w-56 h-56 bg-gray-200 relative cursor-pointer">
                                        {imageUrls[index] && (
                                            <img
                                                src={imageUrls[index]!}
                                                alt={`Image ${index + 1}`}
                                                className="object-cover w-full h-full"
                                            />
                                        )}
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <span className="text-black text-2xl">{imageUrls[index] ? '' : '+'}</span>
                                        </div>
                                    </div>
                                </label>
                            ))}
                        </div>
                        <div className="flex justify-center">
                            <button
                                type='submit'
                                className='bg-black w-1/2 text-white p-3 m-3 rounded-md'>
                                ADD PRODUCT
                            </button>
                        </div>
                    </Form>
                </Formik>
            </div>
            <Toaster />
        </>
    )
}

export default AddProduct;