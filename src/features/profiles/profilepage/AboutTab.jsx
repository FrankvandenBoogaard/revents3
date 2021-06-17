import { PaperClipIcon } from "@heroicons/react/outline";
import { useState } from "react";
import { format } from "date-fns";
import ProfileForm from "./ProfileForm";

export default function AboutTab({ profile, isCurrentUser }) {
  const [editMode, setEditMode] = useState(false);

  return (
    <>
      <div className='shadow sm:rounded-md sm:overflow-hidden'>
        <div className='bg-white space-y-6'>
          <div className='flex justify-between px-4 py-5 sm:px-6'>
            <div>
              <h3 className='text-lg leading-6 font-medium text-gray-900'>{`About ${profile.displayName}`}</h3>
              <p className='mt-1 max-w-2xl text-sm text-gray-500'>
                Personal details and application.
              </p>
            </div>
            {isCurrentUser && (
              <button
                type='button'
                className='bg-white border border-gray-300 rounded-md shadow-sm w-20 h-10 text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                onClick={() => setEditMode(!editMode)}
              >
                {editMode ? "Cancel" : "Edit"}
              </button>
            )}
          </div>
          <div className='border-t border-gray-200'>
            {!editMode ? (
              <dl>
                <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                  <dt className='text-sm font-medium text-gray-500'>
                    Full name
                  </dt>
                  <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                    {profile.displayName}
                  </dd>
                </div>
                <div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                  <dt className='text-sm font-medium text-gray-500'>
                    Member since
                  </dt>
                  <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                    {format(profile.createdAt, "dd MMMM yyyy")}
                  </dd>
                </div>
                <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                  <dt className='text-sm font-medium text-gray-500'>
                    Description
                  </dt>
                  <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                    {profile.description || null}
                  </dd>
                </div>
                <div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                  <dt className='text-sm font-medium text-gray-500'>
                    Salary expectation
                  </dt>
                  <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                    $120,000
                  </dd>
                </div>
                <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                  <dt className='text-sm font-medium text-gray-500'>About</dt>
                  <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                    Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim
                    incididunt cillum culpa consequat. Excepteur qui ipsum
                    aliquip consequat sint. Sit id mollit nulla mollit nostrud
                    in ea officia proident. Irure nostrud pariatur mollit ad
                    adipisicing reprehenderit deserunt qui eu.
                  </dd>
                </div>
                <div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                  <dt className='text-sm font-medium text-gray-500'>
                    Attachments
                  </dt>
                  <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                    <ul className='border border-gray-200 rounded-md divide-y divide-gray-200'>
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
                    </ul>
                  </dd>
                </div>
              </dl>
            ) : (
              <ProfileForm profile={profile} />
            )}
          </div>
        </div>
        {/* <div className='px-4 py-3 bg-gray-50 text-right sm:px-6'>
          <button
            type='submit'
            className='bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
          >
            Save
          </button>
        </div> */}
      </div>
    </>
  );
}
