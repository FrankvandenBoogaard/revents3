import { Link } from "react-router-dom";

export default function EventDetailedHeader() {
  return (
    <>
    <div>
        <div className='block bg-indigo-900 py-1 sm:rounded-t-lg'>
        </div>
      </div>
      <div className='relative bg-indigo-800'>
        <div className='absolute inset-0'>
          <img
            className='w-full h-full object-cover'
            src='https://images.unsplash.com/photo-1525130413817-d45c1d127c42?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1920&q=60&&sat=-100'
            alt=''
          />
          <div
            className='absolute inset-0 bg-indigo-800 mix-blend-multiply'
            aria-hidden='true'
          />
        </div>
        <div className='relative max-w-7xl mx-auto py-24 px-4 sm:pt-56 sm:pb-8 sm:px-6 lg:px-8'>
          <h1 className='text-xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl'>
            Event Title
          </h1>
          <p className='mt-6 text-xl text-indigo-100 max-w-3xl'>Event Date.</p>
          <p className='mt-6 text-xl text-indigo-100 max-w-3xl'>
            Hosted by Bob.
          </p>
        </div>
      </div>
      <div className='px-4 py-5 sm:px-6 flex space-x-4'>
        <button
          type='submit'
          className='inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
        >
          Cancel My Place
        </button>
        <button
            as={Link}
            to={`/manage/`}
          type='submit'
          className='inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
        >
          Join This Event
        </button>
        <button
          type='submit'
          className='inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
        >
          Manage Event
        </button>
      </div>
    </>
  );
}
