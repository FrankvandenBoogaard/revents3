import { useDispatch, useSelector } from "react-redux";
import {
  getFollowersCollection,
  getFollowingCollection,
} from "../../../app/firestore/firestoreService";
import useFirestoreCollection from "../../../app/hooks/useFireStoreCollection";
import { listenToFollowers, listenToFollowings } from "../profileActions";
import ProfileCard from "./ProfileCard";

export default function FollowingTab({ profile, currentPane }) {
  const dispatch = useDispatch();
  const { followings, followers } = useSelector((state) => state.profile);

  useFirestoreCollection({
    query:
      currentPane === "Followers"
        ? () => getFollowersCollection(profile.id)
        : () => getFollowingCollection(profile.id),
    data: (data) =>
      currentPane === "Followers"
        ? dispatch(listenToFollowers(data))
        : dispatch(listenToFollowings(data)),
    deps: [currentPane, dispatch],
  });

  return (
    <div className='bg-white overflow-hidden sm:rounded-lg sm:shadow'>
      <div className='bg-white px-4 py-5 border-b border-gray-200 sm:px-6'>
        <h3 className='text-lg leading-6 font-medium text-gray-900'>
          {currentPane === "Followers" ? "Followers" : "Following"}
        </h3>
      </div>
      <div className='divide-y divide-gray-200 bg-gray-50'>
        <ul className='p-3 grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'>
          {currentPane === "Followers" &&
            followers.map((profile) => (
              <ProfileCard profile={profile} key={profile.id} />
            ))}
          {currentPane === "Following" &&
            followings.map((profile) => (
              <ProfileCard profile={profile} key={profile.id} />
            ))}
        </ul>
      </div>
    </div>
  );
}
