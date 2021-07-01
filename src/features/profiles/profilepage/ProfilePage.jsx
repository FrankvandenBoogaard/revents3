import { useDispatch, useSelector } from "react-redux";
import ProfileContent from "./ProfileContent";
import ProfileHeader from "./ProfileHeader";
import useFirestoreDoc from "../../../app/hooks/useFirestoreDoc";
import { getUserProfile } from "../../../app/firestore/firestoreService";
import { listenToSelectedUserProfile } from "../profileActions";
import LoadingComponent from "../../../app/layout/LoadingComponent";

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
export default function ProfilePage({ match }) {
  const dispatch = useDispatch();
  const { selectedUserProfile } = useSelector((state) => state.profile);
  const { currentUser } = useSelector((state) => state.auth);
  const { loading, error } = useSelector((state) => state.async);

  useFirestoreDoc({
    query: () => getUserProfile(match.params.id),
    data: (profile) => dispatch(listenToSelectedUserProfile(profile)),
    deps: [dispatch, match.params.id],
  });

  if ((loading && !selectedUserProfile) || (!selectedUserProfile && !error))
    return <LoadingComponent content='Loading profile...' />;

  return (
    <div className='space-y-6 mb-5'>
      <ProfileHeader
        profile={selectedUserProfile}
        isCurrentUser={currentUser?.uid === selectedUserProfile.id}
      />
      <ProfileContent
        profile={selectedUserProfile}
        isCurrentUser={currentUser?.uid === selectedUserProfile.id}
      />
      {/* <div className='flex justify-end'>
        <button
          type='button'
          className='bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
        >
          Cancel
        </button>
        <button
          type='submit'
          className='ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
        >
          Save
        </button>
      </div> */}
    </div>
  );
}
