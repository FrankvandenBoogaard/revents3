import { CheckIcon } from "@heroicons/react/outline";

export default function LoadingComponent() {
  return (
    <div className='flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
      <div className='fixed inset-0 bg-gray-200 bg-opacity-75'>
        {/* This element is to trick the browser into centering the modal contents. */}
        <span
          className='hidden sm:inline-block sm:align-middle sm:h-screen'
          aria-hidden='true'
        >
          &#8203;
        </span>
        <div className='inline-block align-bottom px-4 pt-5 pb-4 text-left overflow-hidden sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6'>
          <div className='mx-auto flex items-center justify-center h-10 w-10'>
            <svg
              class='animate-spin text-gray-600'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
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
          </div>
          <div className='mt-3 text-center sm:mt-5'>
            <h3 className='text-lg leading-6 font-medium text-gray-700'>
              Loading...
            </h3>
            {/* <div className='mt-2'>
              <p className='text-sm text-gray-500'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Consequatur amet labore.
              </p>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
