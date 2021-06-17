import { Form, Formik } from "formik";
import MyTextArea from "../../../app/common/form/MyTextArea";
import MyTextInput from "../../../app/common/form/MyTextInput";
import * as Yup from "yup";
import { LoadingSpinner } from "../../../app/common/util/util";
import { updateUserProfile } from "../../../app/firestore/firestoreService";
import { toast } from "react-toastify";

export default function ProfileForm({ profile }) {
  return (
    <Formik
      initialValues={{
        displayName: profile.displayName,
        description: profile.description || "",
      }}
      validationSchema={Yup.object({
        displayName: Yup.string().required(),
      })}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          await updateUserProfile(values);
        } catch (error) {
          toast.error(error.message);
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting, isValid, dirty }) => (
        <Form>
          <div className='shadow sm:rounded-md sm:overflow-hidden'>
            <div className='bg-white py-6 px-4 space-y-6 sm:p-6'>
              <div className='grid grid-cols-6 gap-6'>
                <div className='col-span-6 sm:col-span-4'>
                  <label
                    htmlFor='first_name'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Display Name
                  </label>
                  <MyTextInput name='displayName' placeholder='Display Name' />
                </div>
                <div className='col-span-4'>
                  <label
                    htmlFor='about'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Description
                  </label>
                  <div className='mt-1'>
                    <MyTextArea
                      name='description'
                      placeholder='Description'
                      rows={3}
                    />
                  </div>
                  <p className='mt-2 text-sm text-gray-500'>
                    Brief description for your profile. URLs are hyperlinked.
                  </p>
                </div>
              </div>
            </div>
            <div className='px-4 py-3 bg-gray-50 text-right sm:px-6'>
              <span className='relative inline-flex ml-2 rounded-md shadow-sm'>
                <button
                  disabled={!isValid || !dirty || isSubmitting}
                  type='submit'
                  className={`inline-flex items-center justify-center w-28 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                    !isValid || !dirty || isSubmitting
                      ? "disabled:opacity-50 cursor-not-allowed"
                      : null
                  }`}
                >
                  Update profile
                </button>
                {isSubmitting && <LoadingSpinner />}
              </span>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
