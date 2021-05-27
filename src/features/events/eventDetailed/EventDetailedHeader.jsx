import { format } from "date-fns";
import { Link } from "react-router-dom";


export default function EventDetailedHeader({ event }) {
  return (
    <>
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
          <p className='mt-1 text-xl text-indigo-100 max-w-3xl'>{format(event.date, 'MMMM d, yyyy h:mm a')}</p>
          <p className='mt-1 text-xl text-indigo-100 max-w-3xl'>
            Hosted by {event.hostedBy}
          </p>
        </div>
      </div>
      <div className='px-4 py-5 sm:px-6 flex space-x-4'>
        <Link
          className='inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
        >
          Cancel My Place
        </Link>
        <Link
          className='inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
        >
          Join This Event
        </Link>
        <Link
          to={`/manage/${event.id}`}
          className='inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
        >
          Manage Event
        </Link>
      </div>
    </>
  );
}
