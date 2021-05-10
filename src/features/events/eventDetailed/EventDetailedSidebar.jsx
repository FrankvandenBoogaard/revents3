import { PlusIcon } from "@heroicons/react/outline";

export default function EventDetailedSidebar({ attendees }) {
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
              <li
                key={attendee.id}
                className='py-3 flex justify-between items-center'
              >
                <div className='flex items-center'>
                  <img
                    src={attendee.photoURL || "/assets/user.png"}
                    alt=''
                    className='w-8 h-8 rounded-full'
                  />
                  <p className='ml-4 text-sm font-medium text-gray-900'>
                    {attendee.name}
                  </p>
                </div>
                <button
                  type='button'
                  className='ml-6 bg-white rounded-md text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                >
                  Remove<span className='sr-only'> {attendee.displayName}</span>
                </button>
              </li>
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
