import { ClockIcon, LocationMarkerIcon } from "@heroicons/react/outline";
import EventListAttendee from "./EventListAttendee";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { deleteEventInFirestore } from "../../../app/firestore/firestoreService";

export default function EventListItem({ event }) {
  return (
    <div className='bg-white shadow overflow-hidden sm:rounded-lg mb-4'>
      <div className='flex px-4 py-5 sm:px-6'>
        <div className='w-0 flex-1'>
          <div className='flex items-start'>
            <div className='flex-shrink-0 pt-0.5'>
              <img
                className='h-14 w-14 rounded-full float-left mr-4'
                src={event.hostPhotoURL}
                alt=''
              />
            </div>
            <div className='flex-1 w-0 '>
              <h3 className='text-lg leading-6 font-medium text-gray-900'>
                {event.title}
              </h3>
              <p className='mt-1 max-w-2xl text-sm text-gray-500'>
                Hosted by {event.hostedBy}
              </p>
            </div>
          </div>
        </div>
        <div className='flex items-center justify-center'>
          {event.isCancelled && (
            <div className='inline-flex items-center px-2.5 py-0.5 h-8 rounded-md text-sm font-medium bg-red-100 text-red-800'>
              This event has been cancelled
            </div>
          )}
        </div>
      </div>
      
      <div className='border-t border-gray-200'>
        <dl>
          <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
            <dt className='text-sm font-medium text-gray-500'>
              <ClockIcon
                className='flex-shrink-0 h-5 w-5 text-gray-400 float-left mr-1'
                aria-hidden='true'
              />
              Date
            </dt>
            <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
              {format(event.date, "MMMM d, yyyy h:mm a")}
            </dd>
          </div>
          <div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
            <dt className='text-sm font-medium text-gray-500'>
              <LocationMarkerIcon
                className='flex-shrink-0 h-5 w-5 text-gray-400 float-left mr-1'
                aria-hidden='true'
              />
              Venue
            </dt>
            <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
              {event.venue.address}
            </dd>
          </div>
          <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
            <dt className='text-sm font-medium text-gray-500'>Attendees</dt>
            <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
              <div className='flex -space-x-2 overflow-hidden'>
                {event.attendees.map((attendee) => (
                  <EventListAttendee key={attendee.id} attendee={attendee} />
                ))}
              </div>
            </dd>
          </div>
          <div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
            <dt className='text-sm font-medium text-gray-500'>About</dt>
            <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
              {event.description}
            </dd>
          </div>
          <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
            <dt className='text-sm font-medium text-gray-500 col-span-2'></dt>
            <dd className='mt-1 text-sm text-gray-900 sm:mt-0 text-right'>
              <>
                <Link
                  className='whitespace-nowrap text-base font-medium text-red-500 hover:text-red-900'
                  onClick={() => deleteEventInFirestore(event.id)}
                >
                  Delete
                </Link>
                <Link
                  className='ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700'
                  to={`/events/${event.id}`}
                >
                  View
                </Link>
              </>
              {/* <ul className='border border-gray-200 rounded-md divide-y divide-gray-200'>
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
              </ul> */}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
