"use client"
import { authRequired, addCategory, getCategoryDetails, updateCategoryDetails } from '@/store/actions/adminActions/adminActions';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { checkBoxData, radioButtonData } from '@/types/admin';
import categoryFieldValidationSchema from '@/models/validationSchemas/admin/categoryFieldValidation';
import { Toaster } from 'react-hot-toast';

const CategoryForm = () => {
    const dispatch: any = useDispatch();
    const router = useRouter()

    const searchParams = useSearchParams();
    const categoryId: string | any = searchParams.get("categoryId");

    useEffect(() => {
        if (!categoryId) console.log(`now its add category `);
        else {
            console.log(`now its edit category`);
            dispatch(getCategoryDetails(categoryId))
        }
    },[])

    
    
    const errorInitialState = {
        categoryNameError: null,
        inputFieldsError: null,
        checkBoxFieldsError: null,
        radioButtonFieldsError: null,
    }
    const [categoryName, setCategoryName] = useState<string>('');
    const [inputFields, setInputFields] = useState<string[]>([]);
    const [checkBoxFields, setCheckBoxFields] = useState<checkBoxData[]>([]);
    const [radioButtonFields, setRadioButtonFields] = useState<radioButtonData[]>([]);
    const [errors, setErrors] = useState(errorInitialState);
    
    const currentCategoryDetails = useSelector((state: any) => state?.admin?.data?.categoryDetails)
    useEffect(() => {
        setCategoryName(currentCategoryDetails?.categoryName || '');
        setInputFields(currentCategoryDetails?.inputFields || []);
        setCheckBoxFields(currentCategoryDetails?.checkBoxFields || []);
        setRadioButtonFields(currentCategoryDetails?.radioButtonFields || [])
    },[currentCategoryDetails])

    
    useEffect(() => {
        dispatch(authRequired(router))
    }, [])


    const addInputField = () => {
        setInputFields([...inputFields, '']);
    };

    const addCheckBoxField = () => {
        setCheckBoxFields([...checkBoxFields, { label: '', options: [] }])
    }

    const addRadioButtonField = () => {
        setRadioButtonFields([...radioButtonFields, { label: '', options: [] }])
    }

    const handleInputFieldChange = (index: number, value: any) => {
        const updatedInputFields: any = [...inputFields];
        updatedInputFields[index] = value;
        setInputFields(updatedInputFields);
    };

    
    const handleCheckBoxFieldChange = (index: number, fieldKey: keyof checkBoxData, value: string) => {
        const updatedCheckBoxFields = [...checkBoxFields];
        const updatedField = { ...updatedCheckBoxFields[index] }; // Create a copy of the field to modify
    
        if (fieldKey === 'options') {
            const optionsArray = value.split(',').map(option => option.trim());
            updatedField[fieldKey] = optionsArray;
        } else {
            updatedField[fieldKey] = value;
        }
    
        updatedCheckBoxFields[index] = updatedField; // Update the field in the array
    
        setCheckBoxFields(updatedCheckBoxFields);
    };
    

    const handleRadioButtonFieldChange = (index: number, fieldKey: keyof radioButtonData, value: string) => {
        const updatedRadioButtonFields = [...radioButtonFields];
        const updatedField = { ...updatedRadioButtonFields[index] }; 
    
        if (fieldKey === 'options') {
            const optionsArray = value.split(',').map(option => option.trim());
            updatedField[fieldKey] = optionsArray;
        } else {
            updatedField[fieldKey] = value;
        }
        updatedRadioButtonFields[index] = updatedField; 
        setRadioButtonFields(updatedRadioButtonFields);
    };
    

    const spliceField = (stateName: any, SetStateFunction: any, index: number) => {
        const newOne = stateName
        newOne.splice(index, 1)
        SetStateFunction([...newOne])
    }

    const handlesubmit = () => {
        console.log(checkBoxFields);
        
        const categoryDetails = {
            categoryName: categoryName,
            inputFields: inputFields,
            checkBoxFields: checkBoxFields,
            radioButtonFields: radioButtonFields
        }
        categoryFieldValidationSchema.validate(categoryDetails, { abortEarly: false })
            .then(() => {
                console.log(`validation ok`);
                setErrors(errorInitialState)
                if (currentCategoryDetails === undefined) {
                    dispatch(addCategory({ router, categoryDetails }))
                }
                else {
                    dispatch(updateCategoryDetails({router, categoryId, categoryDetails}))
                }
            }).catch(async (err) => {
                const errorTypeMap = {
                    categoryNameError: false,
                    inputFieldsError: false,
                    checkBoxFieldsError: false,
                    radioButtonFieldsError: false,
                };

                if (err.inner) {
                    for (const validationError of err.inner) {
                        console.log(validationError.message);

                        if (!errorTypeMap.categoryNameError && validationError.path === 'categoryName') {
                            setErrors((prevErrors) => ({ ...prevErrors, categoryNameError: validationError.message }));
                            errorTypeMap.categoryNameError = true;
                        }

                        if (!errorTypeMap.inputFieldsError && validationError.path.startsWith('inputFields')) {
                            setErrors((prevErrors) => ({ ...prevErrors, inputFieldsError: validationError.message }));
                            errorTypeMap.inputFieldsError = true;
                        }

                        if (!errorTypeMap.checkBoxFieldsError && validationError.path.startsWith('checkBoxFields')) {
                            setErrors((prevErrors) => ({ ...prevErrors, checkBoxFieldsError: validationError.message }));
                            errorTypeMap.checkBoxFieldsError = true;
                        }

                        if (!errorTypeMap.radioButtonFieldsError && validationError.path.startsWith('radioButtonFields')) {
                            setErrors((prevErrors) => ({ ...prevErrors, radioButtonFieldsError: validationError.message }));
                            errorTypeMap.radioButtonFieldsError = true;
                        }
                    }
                }
            });
    }

    return (
        <>
            <div className="flex justify-between w-full">
                <h1 className='text-xl p-3'>Categories</h1>
            </div>
            <div className="lg:w-1/2 md:w-full p-3">
                <div className="mb-4">
                    <div className="flex justify-between">
                        <label htmlFor="CategoryName" className="block text-center text-sm font-semibold text-gray-600">New Category name:</label>
                        <button
                            onClick={handlesubmit}
                            type="button"
                            className="bg-slate-950 text-white py-1 px-4 rounded">
                            Add Category
                        </button>
                    </div>
                    <input
                        type="text"
                        name="categoryName"
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                        className="p-2 border mt-1 block w-full rounded-md bg-light"
                        placeholder="Enter new category name"
                    />
                </div>
                {errors.categoryNameError && <div className='text-red-600'>{errors.categoryNameError}</div>}
                <label htmlFor="CategoryFields"
                    className="block text-center text-md mb-2 font-semibold text-slate-600">
                    Add special fields required for this category
                </label>
                <div className="w-full flex justify-between">
                    <button
                        type="button"
                        className="bg-slate-950 rounded-md px-3 text-white"
                        onClick={addInputField}>
                        Add Input Field
                    </button>
                    <button
                        type='button'
                        className='bg-slate-950 rounded-md px-3 text-white'
                        onClick={addCheckBoxField}>
                        Add Check box Field
                    </button>
                    <button
                        type='button'
                        className='bg-slate-950 rounded-md px-3 py-1 text-white'
                        onClick={addRadioButtonField}>
                        Add Radio button Field
                    </button>
                </div>
                {inputFields?.length > 0 && <h1 className='text-xl mt-4'>Input Field names</h1>}
                {errors?.inputFieldsError && <div className='text-red-600'>{errors?.inputFieldsError}</div>}
                {inputFields?.map((field, index) => (
                    <div key={index}>
                        <div className="flex justify-between">
                            <h1 className='text-xl mt-4'>{index + 1}.</h1>
                            <button className='text-xl mt-4 p-1 cursor-pointer'
                                onClick={() => spliceField(inputFields, setInputFields, index)}>X</button>
                        </div>
                        <div className="mb-4">
                            <input
                                type="text"
                                name={`inputField${index}`}
                                value={field}
                                onChange={(e) => handleInputFieldChange(index, e.target.value)}
                                className="p-2 border mt-1 block w-full rounded-md bg-light"
                                placeholder={`Enter input field name`}
                            />
                        </div>
                    </div>
                ))}
                {checkBoxFields?.length > 0 && <h1 className='text-xl mt-4'>Check box fields</h1>}
                {errors?.checkBoxFieldsError && <div className='text-red-600'>{errors?.checkBoxFieldsError}</div>}
                {checkBoxFields?.map((field, index) => (
                    <div key={index}>
                        <div className="flex justify-between">
                            <h1 className='text-xl mt-4'>{index + 1}.</h1>
                            <button className='text-xl mt-4 p-1 cursor-pointer'
                                onClick={() => spliceField(checkBoxFields, setCheckBoxFields, index)}>X</button>
                        </div>
                        <div className="mb-4">
                            <input
                                type="text"
                                name={`checkboxlabel${index}`}
                                value={field.label}
                                onChange={(e) => handleCheckBoxFieldChange(index, 'label', e.target.value)}
                                className="p-2 border mt-1 block w-full rounded-md bg-light"
                                placeholder={`Enter label name for checkbox field`}
                            />
                            <input
                                type="text"
                                name={`checkboxoptions${index}`}
                                value={field.options}
                                onChange={(e) => handleCheckBoxFieldChange(index, 'options', e.target.value)}
                                className="p-2 border mt-1 block w-full rounded-md bg-light"
                                placeholder={`Enter checkbox field options separated by comma`}
                            />
                        </div>
                    </div>
                ))}
                {radioButtonFields?.length > 0 && <h1 className='text-xl mt-4'>Radio Button fields</h1>}
                {errors?.radioButtonFieldsError && <div className='text-red-600' >{errors?.radioButtonFieldsError}</div>}
                {radioButtonFields?.map((field, index) => (
                    <div key={index}>
                        <div className="flex justify-between">
                            <h1 className='text-xl mt-4'>{index + 1}.</h1>
                            <button className='text-xl mt-4 p-1 cursor-pointer'
                                onClick={() => spliceField(radioButtonFields, setRadioButtonFields, index)}>X</button>
                        </div>
                        <div className="mb-4">
                            <input
                                type="text"
                                name={`checkboxlabel${index}`}
                                value={field.label}
                                onChange={(e) => handleRadioButtonFieldChange(index, 'label', e.target.value)}
                                className="p-2 border mt-1 block w-full rounded-md bg-light"
                                placeholder={`Enter label name for radio button field`}
                            />
                            <input
                                type="text"
                                name={`checkboxoptions${index}`}
                                value={field.options}
                                onChange={(e) => handleRadioButtonFieldChange(index, 'options', e.target.value)}
                                className="p-2 border mt-1 block w-full rounded-md bg-light"
                                placeholder={`Enter radio field options separated by comma`}
                            />
                        </div>
                    </div>
                ))}
            </div>
            <Toaster />
        </>
    )
}

export default CategoryForm;