import { format } from "date-fns";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { LoadingSpinner } from "../../../app/common/util/util";
import {
  addUserAttendance,
  cancelUserAttendance,
} from "../../../app/firestore/firestoreService";
import UnauthModal from "../../auth/UnauthModal";

export default function EventDetailedHeader({ event, isHost, isGoing }) {
  const [loading, setLoading] = useState(false);
  const { authenticated } = useSelector((state) => state.auth);
  const [modalOpen, setModalOpen] = useState(false);

  async function handleUserJoinEvent() {
    setLoading(true);
    try {
      await addUserAttendance(event);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleUserLeaveEvent() {
    setLoading(true);
    try {
      await cancelUserAttendance(event);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {modalOpen && <UnauthModal setModalOpen={setModalOpen} />}
      <div className='relative'>
        <div className='absolute inset-0'>
          <img
            className='w-full h-full object-cover rounded-t-lg'
            src={`/assets/categoryImages/${event.category}.jpg`}
            alt=''
          />
          <div
            className='absolute inset-0 bg-indigo-600 mix-blend-multiply rounded-t-lg'
            aria-hidden='true'
          />
        </div>
        <div className='relative max-w-7xl mx-auto py-24 px-4 sm:pt-56 sm:pb-8 sm:px-6 lg:px-8'>
          <h1 className='text-xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-4xl'>
            {event.title}
          </h1>
          <p className='mt-1 text-xl text-indigo-100 max-w-3xl'>
            {format(event.date, "MMMM d, yyyy h:mm a")}
          </p>
          <p className='mt-1 text-xl text-indigo-100 max-w-3xl'>
            Hosted by
            <Link to={`/profile/${event.hostUid}`}>{event.hostedBy}</Link>
          </p>
        </div>
      </div>
      <div className='px-4 py-5 sm:px-6 flex space-x-4'>
        {!isHost && (
          <>
            {isGoing ? (
              <span className='relative inline-flex ml-2 rounded-md shadow-sm'>
                <button
                  type='button'
                  className='inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                  onClick={handleUserLeaveEvent}
                >
                  Cancel My Place
                </button>
                {loading && <LoadingSpinner />}
              </span>
            ) : (
              <span className='relative inline-flex ml-2 rounded-md shadow-sm'>
                <button
                  type='button'
                  className='inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                  onClick={
                    authenticated
                      ? handleUserJoinEvent
                      : () => setModalOpen(true)
                  }
                >
                  Join This Event
                </button>
                {loading && <LoadingSpinner />}
              </span>
            )}
          </>
        )}
        {isHost && (
          <Link
            to={`/manage/${event.id}`}
            className='inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
          >
            Manage Event
          </Link>
        )}
      </div>
    </>
  );
}
