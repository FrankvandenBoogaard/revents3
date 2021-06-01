import {
  CalendarIcon,
  InformationCircleIcon,
  LocationMarkerIcon,
} from "@heroicons/react/outline";
import { format } from "date-fns";
import { useState } from "react";
import EventDetailedMap from "./EventDetailedMap";

export default function EventDetailedInfo({ event }) {
  const [mapOpen, setMapOpenToggle] = useState(false);
  return (
    <>
      <div className='border-t border-gray-200 px-4 py-5 sm:px-6'>
        <dl className='grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2'>
          <div className='sm:col-span-2'>
            <dt className='text-sm font-medium text-gray-500'>
              <InformationCircleIcon
                className='flex-shrink-0 h-5 w-5 text-gray-400 float-left mr-1'
                aria-hidden='true'
              />
              {event.description}
            </dt>
            {/* <dd className='mt-1 text-sm text-gray-900'>
                    Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim
                    incididunt cillum culpa consequat. Excepteur qui ipsum
                    aliquip consequat sint. Sit id mollit nulla mollit nostrud
                    in ea officia proident. Irure nostrud pariatur mollit ad
                    adipisicing reprehenderit deserunt qui eu.
                  </dd> */}
          </div>
        </dl>
      </div>
      <div className='border-t border-gray-200 px-4 py-5 sm:px-6'>
        <dl className='grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2'>
          <div className='sm:col-span-2'>
            <dt className='text-sm font-medium text-gray-500'>
              <CalendarIcon
                className='flex-shrink-0 h-5 w-5 text-gray-400 float-left mr-1'
                aria-hidden='true'
              />
              {format(event.date, "MMMM d, yyyy h:mm a")}
            </dt>
            {/* <dd className='mt-1 text-sm text-gray-900'>
                    Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim
                    incididunt cillum culpa consequat. Excepteur qui ipsum
                    aliquip consequat sint. Sit id mollit nulla mollit nostrud
                    in ea officia proident. Irure nostrud pariatur mollit ad
                    adipisicing reprehenderit deserunt qui eu.
                  </dd> */}
          </div>
        </dl>
      </div>
      <div className='flex items-center justify-between border-t border-gray-200 px-4 py-5 sm:px-6'>
        <div className='group inline-flex items-start text-sm space-x-2 text-gray-500'>
          <LocationMarkerIcon
            className='flex-shrink-0 h-5 w-5 text-gray-500'
            aria-hidden='true'
          />
          <span>{event.venue.address}</span>
        </div>
        <button
          onClick={() => setMapOpenToggle(!mapOpen)}
          type='submit'
          className='inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
        >
          {mapOpen ? "Hide map" : "Show map"}
        </button>
      </div>
      {mapOpen && <EventDetailedMap latLng={event.venue.latLng} />}
    </>
  );
}
