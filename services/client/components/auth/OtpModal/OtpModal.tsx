"use client"
import React, { useState, useEffect} from 'react';
import { MdClose } from 'react-icons/md'
import { Formik, Form, Field, ErrorMessage} from 'formik'
import otpValidationSchema from '@/models/validationSchemas/user/otpSchema';
import { signUpCredentials } from '@/types/user';

interface ModalProps {
    isOpen: boolean;
    userData: signUpCredentials | null;
    onClose: () => void;
    onModalSubmit: (userData:signUpCredentials | null, otp: number) => void;
    modalError?: string; 
    resendOtp: any
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onModalSubmit, userData, modalError, resendOtp}) => {

  const [resendTimer, setResendTimer] = useState(60);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isOpen) {
      setResendTimer(60);
      intervalId = setInterval(() => {
        setResendTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isOpen]);

    return (
      <>
        {isOpen && (
          <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg">
              <span className="text-xl flex justify-end pb-4 cursor-pointer" onClick={onClose}>
                <MdClose />
              </span>
              <Formik 
                initialValues={{ otp: '' }} 
                validationSchema={otpValidationSchema}
                onSubmit={(values) => {
                  console.log(values);
                  
                    onModalSubmit( userData, Number(values.otp));
                }}
              >
                <Form>
                {modalError && (
                  <div className="text-red-500 text-xs text-start w-full mb-2">{modalError}</div>
                )}
                  <label>
                    Enter OTP:
                    <Field
                      type="number"
                      name="otp"
                      className="w-full border border-gray-300 p-2 my-2 rounded-md"
                    />
                  </label>
                  <ErrorMessage name="otp" component="div" className="text-red-500 text-xs text-start w-full" />
  
                  {resendTimer > 0 && (
                  <button
                    type="submit"
                    className="bg-gray-950 text-white px-4 py-2 my-4 rounded-md"
                    disabled={resendTimer <= 0}
                  >
                    Submit
                  </button>
                )}
                <div className="w-full flex justify-center">
                  {resendTimer > 0 && `Resend OTP in ${resendTimer} seconds`}
                  {resendTimer === 0 && <button
                    type='button'
                    className='bg-slate-950 text-white p-2 rounded-md'
                    onClick={() => {
                      resendOtp(userData)
                      setResendTimer(60)
                    }}
                    disabled={resendTimer > 0}>
                      Resend OTP
                    </button>}
                </div>
                </Form>
              </Formik>
            </div>
          </div>
        )}
      </>
    );
  };
  
  export default Modal;
  

