/* This example requires Tailwind CSS v2.0+ */
import { Popover } from "@headlessui/react";
import { NavLink } from "react-router-dom";
import SignedOutMenu from "./SignedOutMenu";
import SignedInMenu from "./SignedInMenu";
import { useSelector } from "react-redux";

export default function NavBar({ setFormOpen }) {
  const { authenticated } = useSelector((state) => state.auth);

  return (
    <Popover className='relative bg-white'>
      {({ open }) => (
        <>
          <div className='flex justify-between items-center mb-4 border-b-2 border-gray-100 px-4 py-6 md:justify-start md:space-x-10'>
            <div className='flex justify-start lg:w-0 lg:flex-1'>
              <NavLink exact to='/'>
                <span className='sr-only'>Workflow</span>
                <img
                  className='ml-4 h-8 w-auto sm:h-10'
                  src='https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg'
                  alt=''
                />
              </NavLink>
              {/* <div className='-mr-2 -my-2 md:hidden'>
              <Popover.Button className='bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500'>
                <span className='sr-only'>Open menu</span>
                <MenuIcon className='h-6 w-6' aria-hidden='true' />
              </Popover.Button>
            </div> */}
              <Popover.Group
                as='nav'
                className='ml-8 items-center hidden md:flex space-x-10'
              >
                {/* <Popover className='relative'>
                {({ open }) => (
                  <>
                    <Popover.Button
                      className={classNames(
                        open ? "text-gray-900" : "text-gray-500",
                        "group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      )}
                    >
                      <span>Solutions</span>
                      <ChevronDownIcon
                        className={classNames(
                          open ? "text-gray-600" : "text-gray-400",
                          "ml-2 h-5 w-5 group-hover:text-gray-500"
                        )}
                        aria-hidden='true'
                      />
                    </Popover.Button>

                    <Transition
                      show={open}
                      as={Fragment}
                      enter='transition ease-out duration-200'
                      enterFrom='opacity-0 translate-y-1'
                      enterTo='opacity-100 translate-y-0'
                      leave='transition ease-in duration-150'
                      leaveFrom='opacity-100 translate-y-0'
                      leaveTo='opacity-0 translate-y-1'
                    >
                      <Popover.Panel
                        static
                        className='absolute z-10 -ml-4 mt-3 transform px-2 w-screen max-w-md sm:px-0 lg:ml-0 lg:left-1/2 lg:-translate-x-1/2'
                      >
                        <div className='rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden'>
                          <div className='relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8'>
                            {solutions.map((item) => (
                              <a
                                key={item.name}
                                href={item.href}
                                className='-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50'
                              >
                                <item.icon
                                  className='flex-shrink-0 h-6 w-6 text-indigo-600'
                                  aria-hidden='true'
                                />
                                <div className='ml-4'>
                                  <p className='text-base font-medium text-gray-900'>
                                    {item.name}
                                  </p>
                                  <p className='mt-1 text-sm text-gray-500'>
                                    {item.description}
                                  </p>
                                </div>
                              </a>
                            ))}
                          </div>
                          <div className='px-5 py-5 bg-gray-50 space-y-6 sm:flex sm:space-y-0 sm:space-x-10 sm:px-8'>
                            {callsToAction.map((item) => (
                              <div key={item.name} className='flow-root'>
                                <a
                                  href={item.href}
                                  className='-m-3 p-3 flex items-center rounded-md text-base font-medium text-gray-900 hover:bg-gray-100'
                                >
                                  <item.icon
                                    className='flex-shrink-0 h-6 w-6 text-gray-400'
                                    aria-hidden='true'
                                  />
                                  <span className='ml-3'>{item.name}</span>
                                </a>
                              </div>
                            ))}
                          </div>
                        </div>
                      </Popover.Panel>
                    </Transition>
                  </>
                )}
              </Popover> */}

                <NavLink
                  to='/events'
                  className='text-base font-medium text-gray-500 hover:text-gray-900'
                >
                  Events
                </NavLink>
                <NavLink
                  to='/sandbox'
                  className='text-base font-medium text-gray-500 hover:text-gray-900'
                >
                  Sandbox
                </NavLink>
                {authenticated && (
                  <NavLink
                    to='/createEvent'
                    className='text-base font-medium text-gray-500 hover:text-gray-900'
                  >
                    Create Event
                  </NavLink>
                )}

                {/* <Popover className='relative'>
                  {({ open }) => (
                    <>
                      <Popover.Button
                        className={classNames(
                          open ? "text-gray-900" : "text-gray-500",
                          "group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        )}
                      >
                        <span>More</span>
                        <ChevronDownIcon
                          className={classNames(
                            open ? "text-gray-600" : "text-gray-400",
                            "ml-2 h-5 w-5 group-hover:text-gray-500"
                          )}
                          aria-hidden='true'
                        />
                      </Popover.Button>

                      <Transition
                        show={open}
                        as={Fragment}
                        enter='transition ease-out duration-200'
                        enterFrom='opacity-0 translate-y-1'
                        enterTo='opacity-100 translate-y-0'
                        leave='transition ease-in duration-150'
                        leaveFrom='opacity-100 translate-y-0'
                        leaveTo='opacity-0 translate-y-1'
                      >
                        <Popover.Panel
                          static
                          className='absolute z-10 left-1/2 transform -translate-x-1/2 mt-3 px-2 w-screen max-w-md sm:px-0'
                        >
                          <div className='rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden'>
                            <div className='relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8'>
                              {resources.map((item) => (
                                <a
                                  key={item.name}
                                  href={item.href}
                                  className='-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50'
                                >
                                  <item.icon
                                    className='flex-shrink-0 h-6 w-6 text-indigo-600'
                                    aria-hidden='true'
                                  />
                                  <div className='ml-4'>
                                    <p className='text-base font-medium text-gray-900'>
                                      {item.name}
                                    </p>
                                    <p className='mt-1 text-sm text-gray-500'>
                                      {item.description}
                                    </p>
                                  </div>
                                </a>
                              ))}
                            </div>
                            <div className='px-5 py-5 bg-gray-50 sm:px-8 sm:py-8'>
                              <div>
                                <h3 className='text-sm tracking-wide font-medium text-gray-500 uppercase'>
                                  Recent Posts
                                </h3>
                                <ul className='mt-4 space-y-4'>
                                  {recentPosts.map((post) => (
                                    <li
                                      key={post.id}
                                      className='text-base truncate'
                                    >
                                      <a
                                        href={post.href}
                                        className='font-medium text-gray-900 hover:text-gray-700'
                                      >
                                        {post.name}
                                      </a>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div className='mt-5 text-sm'>
                                <a
                                  href='#'
                                  className='font-medium text-indigo-600 hover:text-indigo-500'
                                >
                                  {" "}
                                  View all posts{" "}
                                  <span aria-hidden='true'>&rarr;</span>
                                </a>
                              </div>
                            </div>
                          </div>
                        </Popover.Panel>
                      </Transition>
                    </>
                  )}
                </Popover> */}
              </Popover.Group>
            </div>
            {authenticated ? <SignedInMenu /> : <SignedOutMenu />}
          </div>
        </>
      )}
    </Popover>
  );
}
