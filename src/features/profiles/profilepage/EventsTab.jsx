import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserEventsQuery } from "../../../app/firestore/firestoreService";
import useFirestoreCollection from "../../../app/hooks/useFireStoreCollection";
import { listenToUserEvents } from "../profileActions";
import { format } from "date-fns";
import { Link } from "react-router-dom";


function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function EventsTab({ profile }) {
  const dispatch = useDispatch();
  const [currentPane, setCurrentPane] = useState("Future Events");
  const { profileEvents } = useSelector((state) => state.profile);
  const { loading } = useSelector((state) => state.async);

  useFirestoreCollection({
    query: () => getUserEventsQuery(currentPane, profile.id),
    data: (events) => dispatch(listenToUserEvents(events)),
    deps: [dispatch, currentPane, profile.id],
  });

  const tabs = [
    { name: "Future Events", href: "#" },
    { name: "Past Events", href: "#" },
    { name: "Hosting", href: "#" },
  ];

  return (
    <div className='shadow sm:rounded-md sm:overflow-hidden'>
      <div className='bg-white'>
        <div className='flex justify-between px-4 py-5 sm:px-6'>
          <div className='pb-5 border-b border-gray-200 sm:pb-0'>
            <h3 className='text-lg leading-6 font-medium text-gray-900'>
              Events
            </h3>
            <div className='mt-3 sm:mt-4'>
              <div className='sm:hidden'>
                <label htmlFor='current-tab' className='sr-only'>
                  Select a tab
                </label>
                <select
                  id='current-tab'
                  name='current-tab'
                  className='block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md'
                  defaultValue={currentPane}
                >
                  {tabs.map((tab) => (
                    <option key={tab.name}>{tab.name}</option>
                  ))}
                </select>
              </div>
              <div className='hidden sm:block'>
                <nav className='-mb-px flex space-x-8'>
                  {tabs.map((tab) => (
                    <div
                      key={tab.name}
                      //   href={tab.href}
                      className={classNames(
                        tab.name === currentPane
                          ? "border-indigo-500 text-indigo-600"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                        "whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm cursor-pointer"
                      )}
                      aria-current={
                        tab.name === currentPane ? "page" : undefined
                      }
                      onClick={() => setCurrentPane(tab.name)}
                    >
                      {tab.name}
                    </div>
                  ))}
                </nav>
              </div>
            </div>
          </div>
        </div>
        <div className='bg-gray-50'>
          <ul className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-4'>
            {profileEvents.map((event) => (
              <Link
                to={`/events/${event.id}`}
                key={event.id}
                className='col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200'
              >
                <div className='flex-1 flex flex-col pb-8'>
                  <img
                    className='w-auto h-32 overflow-hidden flex-shrink-0 mx-auto bg-black rounded-t-md'
                    src={`/assets/categoryImages/${event.category}.jpg`}
                    alt=''
                  />
                  <h3 className='mt-6 text-gray-900 text-sm font-medium py-2'>
                    {event.title}
                  </h3>
                  <dl className='mt-1 flex-grow flex flex-col justify-between'>
                    <dt className='sr-only'>Date</dt>
                    <dd className='text-gray-500 text-sm py-2'>
                      {format(event.date, "dd MMM yyyy")}
                    </dd>
                    <dt className='sr-only'>Time</dt>
                    <dd className='text-gray-500 text-sm py-2'>
                      {format(event.date, "hh:mm a")}
                    </dd>
                  </dl>
                </div>
              </Link>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
