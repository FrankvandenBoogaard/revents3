/* global google */
import { Link, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import MyTextInput from "../../../app/common/form/MyTextInput";
import { listenToEvents } from "../eventActions";
import MyTextArea from "../../../app/common/form/MyTextArea";
import MySelectInput from "../../../app/common/form/MySelectInput";
import MyDateInput from "../../../app/common/form/MyDateInput";
import MyPlaceInput from "../../../app/common/form/MyPlaceInput";
import useFirestoreDoc from "../../../app/hooks/useFirestoreDoc";
import {
  addEventToFirestore,
  cancelEventToggle,
  listenToEventFromFirestore,
  updateEventInFirestore,
} from "../../../app/firestore/firestoreService";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { toast } from "react-toastify";
import { LoadingSpinner } from "../../../app/common/util/util";
import { useState } from "react";
import Confirm from "../../../app/common/modals/Confirm";

export default function EventForm({ match, history }) {
  const dispatch = useDispatch();
  const [loadingCancel, setLoadingCancel] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const selectedEvent = useSelector((state) =>
    state.event.events.find((e) => e.id === match.params.id)
  );
  const { loading, error } = useSelector((state) => state.async);

  const initialValues = selectedEvent ?? {
    title: "",
    category: "",
    description: "",
    city: {
      address: "",
      latLng: null,
    },
    venue: {
      address: "",
      latLng: null,
    },
    date: "",
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("You must provide a title"),
    category: Yup.string()
      .notOneOf(["- maak een keuze -"])
      .required("You must provide a category"),
    description: Yup.string().required(),
    city: Yup.object().shape({
      address: Yup.string().required("City is required"),
    }),
    venue: Yup.object().shape({
      address: Yup.string().required("Venue is required"),
    }),
    date: Yup.string().required(),
  });

  async function handleCancelToggle(event) {
    setConfirmOpen(false);
    setLoadingCancel(true);
    try {
      await cancelEventToggle(event);
      setLoadingCancel(false);
    } catch (error) {
      setLoadingCancel(true);
      toast.error(error.message);
    }
  }

  useFirestoreDoc({
    shouldExecute: !!match.params.id,
    query: () => listenToEventFromFirestore(match.params.id),
    data: (event) => dispatch(listenToEvents([event])),
    deps: [match.params.id, dispatch],
  });

  if (loading) return <LoadingComponent content='Loading event...' />;

  if (error) return <Redirect to='/error' />;

  return (
    <div className='bg-white shadow overflow-hidden sm:rounded-lg mb-4'>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            selectedEvent
              ? await updateEventInFirestore(values)
              : await addEventToFirestore(values);
            setSubmitting(false);
            history.push("/events");
          } catch (error) {
            toast.error(error.message);
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, dirty, isValid, values }) => (
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
                  <MyPlaceInput name='city' placeholder='Search city ...' />
                  <MyPlaceInput
                    name='venue'
                    disabled={!values.city.latLng}
                    placeholder='Search venue ...'
                    options={{
                      location: new google.maps.LatLng(values.city.latLng),
                      radius: 1000,
                      types: ["establishment"],
                    }}
                  />
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
                {selectedEvent && (
                  <span className='relative inline-flex ml-2 rounded-md shadow-sm'>
                    <button
                      type='button'
                      className={`inline-flex items-center justify-center w-28 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${
                        selectedEvent.isCancelled
                          ? "bg-green-600 hover:bg-green-700 focus:ring-green-500"
                          : "bg-red-600 hover:bg-red-700 focus:ring-red-500"
                      } focus:outline-none focus:ring-2 focus:ring-offset-2`}
                      onClick={() => setConfirmOpen(true)}
                    >
                      {selectedEvent.isCancelled
                        ? "Reactivate Event"
                        : "Cancel Event"}
                    </button>
                    {loadingCancel && <LoadingSpinner />}
                  </span>
                )}
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
                    Submit
                  </button>
                  {isSubmitting && <LoadingSpinner />}
                </span>
                <button
                  as={Link}
                  to='/events'
                  type='submit'
                  disabled={isSubmitting}
                  className='ml-2 border border-gray-300 shadow-sm px-4 py-2 rounded-md whitespace-nowrap text-sm w-28 font-medium text-gray-500 hover:text-gray-900'
                >
                  Cancel
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
      <Confirm
        content={
          selectedEvent?.isCancelled
            ? "This will reactivate the event."
            : "This will cancel the event."
        }
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={() => handleCancelToggle(selectedEvent)}
      />
    </div>
  );
}
