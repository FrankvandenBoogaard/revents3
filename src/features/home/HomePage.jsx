/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ]
  }
  ```
*/
import { ArrowRightIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className='min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full space-y-8'>
        <div>
          <img
            className='mx-auto h-12 w-auto'
            src='https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg'
            alt='Workflow'
          />
          <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
            Re-vents
          </h2>
          <p className='mt-2 text-center text-sm text-indigo-600'>
            Your online eventscheduler
          </p>
        </div>
        <div className='mt-8 space-y-6'>
          <div>
            <Link
              to={"/events"}
              className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
            >
              Get started
              <span className='left-0 inset-y-0 flex items-center pl-3'>
                <ArrowRightIcon
                  className='h-5 w-5 text-indigo-500 group-hover:text-indigo-400'
                  aria-hidden='true'
                />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
