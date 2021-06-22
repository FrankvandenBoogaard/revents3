import { PlusIcon } from "@heroicons/react/outline";
import { Link } from "react-router-dom";

export default function EventDetailedSidebar({ attendees, hostUid }) {
  return (
    <section
      aria-labelledby='timeline-title'
      className='lg:col-start-3 lg:col-span-1'
    >
      <div className='bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6'>
        <h2
          id='timeline-title'
          className='text-lg text-center font-medium text-gray-900'
        >
          {attendees.length} {attendees.length > 1 ? "people" : "person"} going
        </h2>

        {/* Activity Feed */}
        <div>
          <ul className='mt-2 border-t border-b border-gray-200 divide-y divide-gray-200'>
            {attendees.map((attendee) => (
              <div
                key={attendee.id}
                className='border-t border-gray-200 pr-4 py-2 sm:pr-6'
              >
                <dl className='grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2'>
                  <div className='sm:col-span-2'>
                    <dt className='text-sm font-medium text-gray-500 flex items-center justify-between'>
                      <div className='group inline-flex items-start'>
                        <Link
                          to={`/profile/${attendee.id}`}
                          key={attendee.id}
                          className='p-1 -ml-1 flex justify-between items-center'
                        >
                          <img
                            src={attendee.photoURL || "/assets/user.png"}
                            alt=''
                            className='w-8 h-8 rounded-full'
                          />
                          <span className='ml-4 text-sm font-medium text-gray-900'>
                            {attendee.displayName}
                          </span>
                        </Link>
                      </div>
                      {hostUid === attendee.id && (
                        <span className='inline-flex ml-4 px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800'>
                          Host
                        </span>
                      )}
                      <button
                        type='button'
                        className='inline-flex ml-6 bg-white rounded-md text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                      >
                        Remove
                        <span className='sr-only'> {attendee.displayName}</span>
                      </button>
                    </dt>
                  </div>
                </dl>
              </div>

              // <div>
              //   <Link
              //     to={`/profile/${attendee.id}`}
              //     key={attendee.id}
              //     className='py-3 flex justify-between items-center'
              //   >
              //     <div className='flex items-center'>
              //       <img
              //         src={attendee.photoURL || "/assets/user.png"}
              //         alt=''
              //         className='w-8 h-8 rounded-full'
              //       />
              //       <p className='ml-4 text-sm font-medium text-gray-900'>
              //         {attendee.displayName}
              //       </p>
              //       {hostUid === attendee.id && (
              //         <span className='inline-flex items-center ml-4 px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800'>
              //           Host
              //         </span>
              //       )}
              //     </div>
              //   </Link>
              //   <button
              //     type='button'
              //     className='inline-flex ml-6 bg-white rounded-md text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
              //   >
              //     Remove<span className='sr-only'> {attendee.displayName}</span>
              //   </button>
              // </div>
            ))}
            <li className='py-2 flex justify-between items-center'>
              <button
                type='button'
                className='group -ml-1 bg-white p-1 rounded-md flex items-center focus:outline-none focus:ring-2 focus:ring-indigo-500'
              >
                <span className='w-8 h-8 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400'>
                  <PlusIcon className='h-5 w-5' aria-hidden='true' />
                </span>
                <span className='ml-4 text-sm font-medium text-indigo-600 group-hover:text-indigo-500'>
                  Share
                </span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
