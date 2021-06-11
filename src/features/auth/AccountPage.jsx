/* This example requires Tailwind CSS v2.0+ */
import { Form, Formik } from "formik";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import MyTextInput from "../../app/common/form/MyTextInput";
import { LoadingSpinner } from "../../app/common/util/util";
import { updateUserPassword } from "../../app/firestore/firebaseService";

export default function AccountPage() {
  const { currentUser } = useSelector((state) => state.auth);

  return (
    <Formik
      initialValues={{ newPassword1: "", newPassword2: "" }}
      validationSchema={Yup.object({
        newPassword1: Yup.string().required("Password is required"),
        newPassword2: Yup.string().oneOf(
          [Yup.ref("newPassword1"), null],
          "Passwords do not match"
        ),
      })}
      onSubmit={async (values, { setSubmitting, setErrors }) => {
        try {
          await updateUserPassword(values);
          setSubmitting(false);
        } catch (error) {
          setErrors({ auth: error.message });
          setSubmitting(false);
        }
      }}
    >
      {/* Destructuring waarden vanuit Formik */}
      {({ errors, isSubmitting, isValid, dirty }) => (
        <Form>
          <div className='bg-white shadow overflow-hidden sm:rounded-lg'>
            <div className='px-4 py-5 sm:px-6'>
              <h3 className='text-lg leading-6 font-medium text-gray-900'>
                Account
              </h3>
              <p className='mt-1 max-w-2xl text-sm text-gray-500'>
                Use this form to change your password.
              </p>
            </div>
            <div className='border-t border-gray-200'>
              <dl>
                {currentUser.providerId === "password" && (
                  <>
                    <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                      <dt className='text-sm font-medium text-gray-500'>
                        Change password
                      </dt>
                      <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                        <MyTextInput
                          name='newPassword1'
                          type='password'
                          placeholder='New Password'
                        />
                      </dd>
                    </div>
                    <div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                      <dt className='text-sm font-medium text-gray-500'>
                        {/* Application for */}
                      </dt>
                      <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                        <MyTextInput
                          name='newPassword2'
                          type='password'
                          placeholder='Confirm Password'
                        />
                      </dd>
                    </div>
                    <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                      <dt className='text-sm font-medium text-gray-500'></dt>
                      <dd className='text-right mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                        {errors.auth && (
                          <h3 className='flex justify-center mt-1 text-sm font-medium text-red-800'>
                            {errors.auth}
                          </h3>
                        )}
                        <button
                          type='submit'
                          disabled={!isValid || isSubmitting || !dirty}
                          className='mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm'
                          onClick={""}
                        >
                          Update password
                        </button>
                        {isSubmitting && <LoadingSpinner />}
                      </dd>
                    </div>
                  </>
                )}
                {currentUser.providerId === "facebook.com" && (
                  <>
                    <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                      <dt className='text-sm font-medium text-gray-500'>
                        Facebook account
                      </dt>
                      <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                        {/* hier tekst */}
                      </dd>
                    </div>
                    <div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                      <dt className='text-sm text-gray-500'>
                        Please visit Facebook to update your account
                      </dt>
                      <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                        <span>
                          <Link
                            to={{ pathname: "https://facebook.com" }}
                            target='_blank'
                            className='mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-14 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm'
                          >
                            <span className='sr-only'>
                              Sign in with Facebook
                            </span>
                            <svg
                              className='w-5 h-5'
                              aria-hidden='true'
                              viewBox='0 0 20 20'
                              fit=''
                              preserveAspectRatio='xMidYMid meet'
                              focusable='false'
                            >
                              <path
                                d='M18.007 19c.55 0 .993-.444.993-.993V1.993A.992.992 0 0018.007 1H1.993A.992.992 0 001 1.993v16.014c0 .55.444.993.993.993h16.014zm-4.587 0v-6.97h2.34l.35-2.717h-2.69V7.578c0-.786.218-1.322 1.346-1.322h1.438v-2.43a18.915 18.915 0 00-2.096-.108c-2.073 0-3.494 1.267-3.494 3.59v2.005H8.268v2.717h2.346V19h2.806z'
                                fill='#3B5998'
                                fill-rule='evenodd'
                              ></path>
                            </svg>
                          </Link>
                          {isSubmitting && <LoadingSpinner />}
                        </span>
                      </dd>
                    </div>
                  </>
                )}
                {currentUser.providerId === "google.com" && (
                  <>
                    <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                      <dt className='text-sm font-medium text-gray-500'>
                        Google account
                      </dt>
                      <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                        {/* margotfoster@example.com */}
                      </dd>
                    </div>
                    <div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                      <dt className='text-sm text-gray-500'>
                        Please visit Google to update your account
                      </dt>
                      <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                        <Link
                          to={{ pathname: "https://google.com" }}
                          target='_blank'
                          className='mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-14 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm'
                        >
                          <span className='sr-only'>Sign in with Google</span>
                          <svg
                            className='w-5 h-5'
                            aria-hidden='true'
                            viewBox='0 0 20 20'
                            fit=''
                            preserveAspectRatio='xMidYMid meet'
                            focusable='false'
                          >
                            <path
                              d='M19.6 10.23c0-.82-.1-1.42-.25-2.05H10v3.72h5.5c-.15.96-.74 2.31-2.04 3.22v2.45h3.16c1.89-1.73 2.98-4.3 2.98-7.34z'
                              fill='#4285F4'
                            ></path>
                            <path
                              d='M13.46 15.13c-.83.59-1.96 1-3.46 1-2.64 0-4.88-1.74-5.68-4.15H1.07v2.52C2.72 17.75 6.09 20 10 20c2.7 0 4.96-.89 6.62-2.42l-3.16-2.45z'
                              fill='#34A853'
                            ></path>
                            <path
                              d='M3.99 10c0-.69.12-1.35.32-1.97V5.51H1.07A9.973 9.973 0 000 10c0 1.61.39 3.14 1.07 4.49l3.24-2.52c-.2-.62-.32-1.28-.32-1.97z'
                              fill='#FBBC05'
                            ></path>
                            <path
                              d='M10 3.88c1.88 0 3.13.81 3.85 1.48l2.84-2.76C14.96.99 12.7 0 10 0 6.09 0 2.72 2.25 1.07 5.51l3.24 2.52C5.12 5.62 7.36 3.88 10 3.88z'
                              fill='#EA4335'
                            ></path>
                          </svg>
                        </Link>
                      </dd>
                    </div>
                  </>
                )}
                {/* <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
            <dt className='text-sm font-medium text-gray-500'>About</dt>
            <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
              Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim
              incididunt cillum culpa consequat. Excepteur qui ipsum aliquip
              consequat sint. Sit id mollit nulla mollit nostrud in ea officia
              proident. Irure nostrud pariatur mollit ad adipisicing
              reprehenderit deserunt qui eu.
            </dd>
          </div>
          <div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
            <dt className='text-sm font-medium text-gray-500'>Attachments</dt>
            <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
              <ul className='border border-gray-200 rounded-md divide-y divide-gray-200'>
                <li className='pl-3 pr-4 py-3 flex items-center justify-between text-sm'>
                  <div className='w-0 flex-1 flex items-center'>
                    <PaperClipIcon
                      className='flex-shrink-0 h-5 w-5 text-gray-400'
                      aria-hidden='true'
                    />
                    <span className='ml-2 flex-1 w-0 truncate'>
                      resume_back_end_developer.pdf
                    </span>
                  </div>
                  <div className='ml-4 flex-shrink-0'>
                    <a
                      href='#'
                      className='font-medium text-indigo-600 hover:text-indigo-500'
                    >
                      Download
                    </a>
                  </div>
                </li>
                <li className='pl-3 pr-4 py-3 flex items-center justify-between text-sm'>
                  <div className='w-0 flex-1 flex items-center'>
                    <PaperClipIcon
                      className='flex-shrink-0 h-5 w-5 text-gray-400'
                      aria-hidden='true'
                    />
                    <span className='ml-2 flex-1 w-0 truncate'>
                      coverletter_back_end_developer.pdf
                    </span>
                  </div>
                  <div className='ml-4 flex-shrink-0'>
                    <a
                      href='#'
                      className='font-medium text-indigo-600 hover:text-indigo-500'
                    >
                      Download
                    </a>
                  </div>
                </li>
              </ul>
            </dd>
          </div> */}
              </dl>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
