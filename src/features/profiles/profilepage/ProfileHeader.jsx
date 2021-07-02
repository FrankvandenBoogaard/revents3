import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { LoadingSpinner } from "../../../app/common/util/util";
import {
  followUser,
  getFollowingDoc,
  unFollowUser,
} from "../../../app/firestore/firestoreService";
import { setFollowUser, setUnFollowUser } from "../profileActions";
import { CLEAR_FOLLOWINGS } from "../profileConstants";

export default function ProfileHeader({ profile, isCurrentUser }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState();
  const { followingUser } = useSelector((state) => state.profile);

  useEffect(() => {
    if (isCurrentUser) return;
    setLoading(true);
    async function fetchFollowingDoc() {
      try {
        const followingDoc = await getFollowingDoc(profile.id);
        if (followingDoc && followingDoc.exists) {
          dispatch(setFollowUser());
        }
      } catch (error) {
        toast.error(error.message);
      }
    }
    fetchFollowingDoc().then(() => setLoading(false));
    return () => dispatch({ type: CLEAR_FOLLOWINGS });
  }, [dispatch, profile.id, isCurrentUser]);

  async function handleFollowUser() {
    setLoading(true);
    try {
      await followUser(profile);
      dispatch(setFollowUser());
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }
  async function handleUnFollowUser() {
    setLoading(true);
    try {
      await unFollowUser(profile);
      dispatch(setUnFollowUser());
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6'>
      <div className='md:grid md:grid-cols-3 md:gap-6'>
        <div className='md:col-span-1'>
          <h3 className='text-lg font-medium leading-6 text-gray-900'>
            Profile
          </h3>
          {!isCurrentUser &&
            (followingUser ? (
              <span className='my-2 -ml-2 inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800'>
                Following
              </span>
            ) : (
              <span className='my-2 -ml-2 inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-red-100 text-red-800'>
                Not Following
              </span>
            ))}
          <p className='mt-1 text-sm text-gray-500'>
            This information will be displayed publicly so be careful what you
            share.
          </p>
        </div>
        <div className='md:col-span-2'>
          <dl className='grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2'>
            <div className='sm:col-span-1'>
              <dt className='text-sm font-medium text-gray-500'>Username</dt>
              <dd className='mt-1 text-sm text-gray-900'>
                {profile.displayName}
              </dd>
            </div>
            <div className='sm:col-span-1'>
              <dt className='text-sm font-medium text-gray-500'>
                {/* Application for */}
              </dt>
              <dd className='mt-1 text-sm text-gray-900'>
                {/* Backend Developer */}
              </dd>
            </div>
            <div className='sm:col-span-1'>
              <dt className='text-sm font-medium text-gray-500'>Followers</dt>
              <dd className='mt-1 text-3xl text-gray-900'>
                {profile.followerCount || 0}
              </dd>
            </div>
            <div className='sm:col-span-1'>
              <dt className='text-sm font-medium text-gray-500'>Following</dt>
              <dd className='mt-1 text-3xl text-gray-900'>
                {profile.followingCount || 0}
              </dd>
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700'>
                Photo
              </label>
              <div className='mt-1 flex items-center space-x-5'>
                <img
                  className='h-12 w-12 rounded-full float-left mr-1'
                  src={profile.photoURL || "/assets/user.png"}
                  alt=''
                />

                {/* <button
                  type='button'
                  className='bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                >
                  Change
                </button> */}
              </div>
            </div>

            {!isCurrentUser && (
              <div className='sm:col-span-2'>
                <span className='relative inline-flex rounded-md shadow-sm'>
                  <button
                    name='follow'
                    type='button'
                    className='inline-flex items-center justify-center w-24 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-400 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                    onClick={
                      followingUser
                        ? () => handleUnFollowUser()
                        : () => handleFollowUser()
                    }
                  >
                    {followingUser ? "Unfollow" : "Follow"}
                  </button>
                  {loading && <LoadingSpinner />}
                </span>
              </div>
            )}
            {/* <div className='sm:col-span-2'>
              <dt className='text-sm font-medium text-gray-500'>Attachments</dt>
              <dd className='mt-1 text-sm text-gray-900'>
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
            </div> */}
          </dl>
        </div>
        {/* <div className='mt-5 md:mt-0 md:col-span-2'>
          <form className='space-y-6' action='#' method='POST'>
            <div className='grid grid-cols-3 gap-6'>
              <div className='col-span-3 sm:col-span-2'>
                <label
                  htmlFor='company_website'
                  className='block text-sm font-medium text-gray-700'
                >
                  Website
                </label>
                <div className='mt-1 flex rounded-md shadow-sm'>
                  <span className='inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm'>
                    http://
                  </span>
                  <input
                    type='text'
                    name='company_website'
                    id='company_website'
                    className='focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300'
                    placeholder='www.example.com'
                  />
                </div>
              </div>
            </div>

            <div>
              <label
                htmlFor='about'
                className='block text-sm font-medium text-gray-700'
              >
                About
              </label>
              <div className='mt-1'>
                <textarea
                  id='about'
                  name='about'
                  rows={3}
                  className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md'
                  placeholder='you@example.com'
                />
              </div>
              <p className='mt-2 text-sm text-gray-500'>
                Brief description for your profile. URLs are hyperlinked.
              </p>
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700'>
                Photo
              </label>
              <div className='mt-1 flex items-center space-x-5'>
                <img
                  className='h-12 w-12 rounded-full float-left mr-1'
                  src='/assets/user.png'
                  alt=''
                />
                {/* <span className='inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100'>
                  <svg
                    className='h-full w-full text-gray-300'
                    fill='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path d='M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z' />
                  </svg>
                </span> 
                <button
                  type='button'
                  className='bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                >
                  Change
                </button>
              </div>
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700'>
                Cover photo
              </label>
              <div className='mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md'>
                <div className='space-y-1 text-center'>
                  <svg
                    className='mx-auto h-12 w-12 text-gray-400'
                    stroke='currentColor'
                    fill='none'
                    viewBox='0 0 48 48'
                    aria-hidden='true'
                  >
                    <path
                      d='M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02'
                      strokeWidth={2}
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                  <div className='flex text-sm text-gray-600'>
                    <label
                      htmlFor='file-upload'
                      className='relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500'
                    >
                      <span>Upload a file</span>
                      <input
                        id='file-upload'
                        name='file-upload'
                        type='file'
                        className='sr-only'
                      />
                    </label>
                    <p className='pl-1'>or drag and drop</p>
                  </div>
                  <p className='text-xs text-gray-500'>
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
            </div>
          </form>
        </div> */}
      </div>
    </div>
  );
}
