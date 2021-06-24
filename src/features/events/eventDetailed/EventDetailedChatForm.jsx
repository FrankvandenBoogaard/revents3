import { Form, Formik, Field } from "formik";
import { toast } from "react-toastify";
import { addEventChatComment } from "../../../app/firestore/firebaseService";
import * as Yup from "yup";

export default function EventDetailedChatForm({
  eventId,
  currentUser,
  parentId,
  closeForm,
}) {
  return (
    <Formik
      initialValues={{ comment: "" }}
      validationSchema={Yup.object({
        comment: Yup.string().required(),
      })}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        try {
          await addEventChatComment(eventId, { ...values, parentId });
          resetForm();
        } catch (error) {
          toast.error(error.message);
        } finally {
          setSubmitting(false);
          closeForm({open: false, commentId: null})
        }
      }}
    >
      {({ isSubmitting, handleSubmit, isValid }) => (
        <div className='bg-gray-50 px-4 py-6 sm:px-6'>
          <div className='flex space-x-3'>
            <div className='flex-shrink-0'>
              <img
                className='h-10 w-10 rounded-full'
                src={currentUser.photoURL || "/assets/user.png"}
                alt=''
              />
            </div>
            <div className='min-w-0 flex-1'>
              <Form>
                <div className='w-full'>
                  <label htmlFor='comment' className='sr-only'>
                    About
                  </label>
                  <Field name='comment'>
                    {({ field }) => (
                      <div style={{ position: "relative" }}>
                        <textarea
                          {...field}
                          id='comment'
                          name='comment'
                          rows={2}
                          className='shadow-sm block w-full focus:ring-blue-500 focus:border-blue-500 sm:text-sm border border-gray-300 rounded-md'
                          placeholder='Enter your comment (Enter to submit, SHIFT + Enter for new line)'
                          defaultValue={""}
                          onKeyPress={(e) => {
                            if (e.key === "Enter" && e.shiftKey) {
                              return;
                            }
                            if (e.key === "Enter" && !e.shiftKey) {
                              e.preventDefault();
                              isValid && handleSubmit();
                            }
                          }}
                        />
                      </div>
                    )}
                  </Field>
                </div>
                {/* <div className='mt-3 flex items-center justify-end'>
                  <a
                    href='#'
                    className='group inline-flex items-start text-sm space-x-2 text-gray-500 hover:text-gray-900'
                  >
                    <QuestionMarkCircleIcon
                      className='flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-500'
                      aria-hidden='true'
                    />
                    <span>Some HTML is okay.</span>
                  </a>
                  <span className='relative inline-flex ml-2 rounded-md shadow-sm'>
                    <button
                      type='submit'
                      className='inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                    >
                      Ad reply
                    </button>
                    {isSubmitting && <LoadingSpinner />}
                  </span>
                </div> */}
              </Form>
            </div>
          </div>
        </div>
      )}
    </Formik>
  );
}
