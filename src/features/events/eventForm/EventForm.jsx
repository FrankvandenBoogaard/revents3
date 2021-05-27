import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import MyTextInput from "../../../app/common/form/MyTextInput";
import cuid from "cuid";
import { updateEvent, createEvent } from "../eventActions";
import MyTextArea from "../../../app/common/form/MyTextArea";
import MySelectInput from "../../../app/common/form/MySelectInput";
import MyDateInput from "../../../app/common/form/MyDateInput";

export default function EventForm({ match, history }) {
  const dispatch = useDispatch();
  const selectedEvent = useSelector((state) =>
    state.event.events.find((e) => e.id === match.params.id)
  );

  const initialValues = selectedEvent ?? {
    title: "",
    category: "",
    description: "",
    city: "",
    venue: "",
    date: "",
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("You must provide a title"),
    category: Yup.string()
      .notOneOf(["- maak een keuze -"])
      .required("You must provide a category"),
    description: Yup.string().required(),
    city: Yup.string().required(),
    venue: Yup.string().required(),
    date: Yup.string().required(),
  });

  return (
    <div className='bg-white shadow overflow-hidden sm:rounded-lg mb-4'>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          selectedEvent
            ? dispatch(updateEvent({ ...selectedEvent, ...values }))
            : dispatch(
                createEvent({
                  ...values,
                  id: cuid(),
                  hostedBy: "Bob",
                  attendees: [],
                  hostPhotoURL: "/assets/user.png",
                })
              );
          history.push("/events");
        }}
      >
        {({ isSubmitting, dirty, isValid }) => (
          <Form>
            {/* <form action='#' method='POST'> */}
            <div className='px-4 pt-5 sm:px-6'>
              <h3 className='text-lg leading-6 font-medium text-gray-900'>
                EVENT DETAILS
              </h3>
            </div>
            <div className='shadow overflow-hidden sm:rounded-md'>
              <div className='px-4 py-5 bg-white sm:p-6'>
                <div className='grid grid-cols-6 gap-3'>
                  <MyTextInput name='title' placeholder='Event title' />
                  <MySelectInput name='category' placeholder='Category' />
                  <MyTextArea
                    name='description'
                    placeholder='Description'
                    rows={3}
                  />
                </div>
              </div>
              <div className='px-4 pt-5 sm:px-6'>
                <h3 className='text-lg leading-6 font-medium text-gray-900'>
                  EVENT LOCATION DETAILS
                </h3>
              </div>
              <div className='px-4 py-5 bg-white sm:p-6'>
                <div className='grid grid-cols-6 gap-3'>
                  <MyTextInput name='city' placeholder='City' />
                  <MyTextInput name='venue' placeholder='Venue' />
                  <MyDateInput
                    name='date'
                    placeholderText='Event date'
                    timeFormat='HH:mm'
                    showTimeSelect
                    timeCaption='time'
                    dateFormat='MMMM d, yyyy h:mm a'
                    autoComplete='off'
                  />
                </div>
              </div>
              <div className='px-4 py-3 bg-gray-50 text-right sm:px-6'>
                <button
                  as={Link}
                  to='/events'
                  type='submit'
                  disabled={isSubmitting}
                  className='whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900'
                >
                  Cancel
                </button>
                <button
                  type='submit'
                  disabled={!isValid || !dirty || isSubmitting}
                  className={`ml-8 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                    !isValid || !dirty || isSubmitting
                      ? "disabled:opacity-50 cursor-wait"
                      : null
                  }`}
                >
                  {isSubmitting ? (
                    <svg
                      className='animate-spin h-5 w-5 mr-3 z-50'
                      viewBox='0 0 24 24'
                    >
                      <circle
                        class='opacity-25'
                        cx='12'
                        cy='12'
                        r='10'
                        stroke='currentColor'
                        stroke-width='4'
                      ></circle>
                      <path
                        class='opacity-75'
                        fill='currentColor'
                        d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                      ></path>
                    </svg>
                  ) : null}
                  Submit
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
