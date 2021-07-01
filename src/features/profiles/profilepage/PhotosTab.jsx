import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import PhotoUploadWidget from "../../../app/common/photos/PhotoUploadWidget";
import { delay, LoadingSpinner } from "../../../app/common/util/util";
import { deleteFromFirebaseStorage } from "../../../app/firestore/firebaseService";
import {
  deletePhotoFromCollection,
  getUserPhotos,
  setMainPhoto,
} from "../../../app/firestore/firestoreService";
import useFirestoreCollection from "../../../app/hooks/useFireStoreCollection";
import { listenToUserPhotos } from "../profileActions";

export default function PhotosTab({ profile, isCurrentUser }) {
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const { photos } = useSelector((state) => state.profile);
  const [updating, setUpdating] = useState({ isUpdating: false, target: null });
  const [deleting, setDeleting] = useState({ isDeleting: false, target: null });

  //   const people = [
  //     {
  //       name: profile.displayName,
  //       title: "Paradigm Representative",
  //       role: "Admin",
  //       email: "janecooper@example.com",
  //       telephone: "+1-202-555-0170",
  //       imageUrl:
  //         "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  //     },
  //     // More people...
  //   ];

  useFirestoreCollection({
    query: () => getUserPhotos(profile.id),
    data: (photos) => dispatch(listenToUserPhotos(photos)),
    deps: [profile.id, dispatch],
  });

  async function handleSetMainPhoto(photo, target) {
    setUpdating({ isUpdating: true, target });
    try {
      await delay(5000);
      await setMainPhoto(photo);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setUpdating({ isUpdating: false, target: null });
    }
  }

  async function handleDeletePhoto(photo, target) {
    setDeleting({ isDeleting: true, target });
    try {
      await delay(5000);
      await deleteFromFirebaseStorage(photo.name);
      await deletePhotoFromCollection(photo.id);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setDeleting({ isDeleting: false, target: null });
    }
  }

  return (
    <>
      <div className='shadow sm:rounded-md sm:overflow-hidden'>
        <div className='bg-white space-y-6'>
          <div className='flex justify-between px-4 py-5 sm:px-6'>
            <div>
              <h3 className='text-lg leading-6 font-medium text-gray-900'>
                Photos
              </h3>
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
                {editMode ? "Cancel" : "Add Photo"}
              </button>
            )}
          </div>
          <div className='border-t border-gray-200 px-4 py-5 sm:px-6'>
            {!editMode ? (
              <ul className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 m-4'>
                {photos.map((photo) => (
                  <li
                    key={photo.id}
                    className='col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200'
                  >
                    <div className='flex-1 flex flex-col p-8'>
                      <img
                        className='w-32 h-32 flex-shrink-0 mx-auto bg-black rounded-full'
                        src={photo.url}
                        alt=''
                      />
                      {/* <h3 className='mt-6 text-gray-900 text-sm font-medium'>
                        {person.name}
                      </h3>
                      <dl className='mt-1 flex-grow flex flex-col justify-between'>
                        <dt className='sr-only'>Title</dt>
                        <dd className='text-gray-500 text-sm'>
                          {person.title}
                        </dd>
                        <dt className='sr-only'>Role</dt>
                        <dd className='mt-3'>
                          <span className='px-2 py-1 text-green-800 text-xs font-medium bg-green-100 rounded-full'>
                            {person.role}
                          </span>
                        </dd>
                      </dl> */}
                    </div>
                    <div>
                      <div className='-mt-px flex divide-x divide-gray-200'>
                        <div className='relative flex-1 inline-flex'>
                          <button
                            name={photo.id}
                            disabled={photo.url === profile.photoURL}
                            type='submit'
                            // href={`mailto:${person.email}`}
                            className={`relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-green-400 font-medium border border-transparent rounded-bl-lg hover:text-gray-500 ${
                              photo.url === profile.photoURL
                                ? "disabled:opacity-50 cursor-not-allowed"
                                : null
                            }`}
                            onClick={(e) => {
                              handleSetMainPhoto(photo, e.target.name);
                            }}
                          >
                            {/* <MailIcon
                              className='w-5 h-5 text-gray-400'
                              aria-hidden='true'
                            /> */}
                            Main
                          </button>
                          {updating.isUpdating &&
                            updating.target === photo.id && <LoadingSpinner />}
                        </div>
                        <div className='relative -ml-px w-0 flex-1 inline-flex'>
                          <button
                            name={photo.id}
                            disabled={photo.url === profile.photoURL}
                            // href={`tel:${person.telephone}`}
                            className={`relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-red-400 font-medium border border-transparent rounded-br-lg hover:text-gray-500 ${
                              photo.url === profile.photoURL
                                ? "disabled:opacity-50 cursor-not-allowed"
                                : null
                            }`}
                            onClick={(e) => {
                              console.log(e.target);
                              handleDeletePhoto(photo, e.target.name);
                            }}
                          >
                            {/* <TrashIcon className='w-5 h-5' aria-hidden='true' /> */}
                            Delete
                          </button>
                          {deleting.isDeleting &&
                            deleting.target === photo.id && <LoadingSpinner />}
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <PhotoUploadWidget setEditMode={setEditMode} />
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
