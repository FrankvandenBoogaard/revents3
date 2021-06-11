import { Form, Formik } from "formik";
import ModalWrapper from "../../app/common/modals/ModalWrapper";
import * as Yup from "yup";
import MyTextInput from "../../app/common/form/MyTextInput";
import { useDispatch } from "react-redux";
import { closeModal } from "../../app/common/modals/modalReducer";
import { registerInFirebase } from "../../app/firestore/firebaseService";
import SocialLogin from "./SocialLogin";

export default function RegisterForm() {
  const dispatch = useDispatch();

  return (
    <ModalWrapper size='mini' header='Register to Re-vents'>
      <Formik
        initialValues={{ displayName: "", email: "", password: "" }}
        validationSchema={Yup.object({
          displayName: Yup.string().required(),
          email: Yup.string().required().email(),
          password: Yup.string().required(),
        })}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          try {
            await registerInFirebase(values);
            setSubmitting(false);
            dispatch(closeModal());
          } catch (error) {
            setErrors({ auth: error.message });
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, isValid, dirty, errors }) => (
          <Form className='ui form'>
            <MyTextInput name='displayName' placeholder='DisplayName' />
            <MyTextInput name='email' placeholder='Email Address' />
            <MyTextInput
              name='password'
              placeholder='Password'
              type='password'
            />
            {errors.auth && (
              <h3 className='flex justify-center mt-1 text-sm font-medium text-red-800'>
                {errors.auth}
              </h3>
            )}
            <button
              type='submit'
              disabled={!isValid || !dirty || isSubmitting}
              className={`mt-5 sm:mt-4 inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 text-sm font-medium  text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                !isValid || !dirty || isSubmitting
                  ? "disabled:opacity-50 cursor-wait"
                  : null
              }`}
            >
              Register
            </button>
            <div className='mt-6'>
              <div className='relative'>
                <div className='absolute inset-0 flex items-center'>
                  <div className='w-full border-t border-gray-300' />
                </div>
                <div className='relative flex justify-center text-sm'>
                  <span className='px-2 bg-white text-gray-500'>
                    Or continue with
                  </span>
                </div>
              </div>
              <SocialLogin />
            </div>
          </Form>
        )}
      </Formik>
    </ModalWrapper>
  );
}
