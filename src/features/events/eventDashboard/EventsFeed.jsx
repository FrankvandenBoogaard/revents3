/* This example requires Tailwind CSS v2.0+ */

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  firebaseObjectToArray,
  getUserFeedRef,
} from "../../../app/firestore/firebaseService";
import { listenToFeed } from "../../profiles/profileActions";
import EventFeedItem from "./EventFeedItem";

export default function EventsFeed() {
  const dispatch = useDispatch();
  const { feed } = useSelector((state) => state.profile);

  useEffect(() => {
    getUserFeedRef().on("value", (snapshot) => {
      if (!snapshot.exists()) {
        return;
      }
      const feed = firebaseObjectToArray(snapshot.val()).reverse();
      dispatch(listenToFeed(feed));
    });
    return () => {
      getUserFeedRef().off();
    };
  }, [dispatch]);

  return (
    <div className='mb-3 bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200'>
      <div className='px-4 py-5 sm:px-6'>
        <h3 className='text-lg leading-6 font-medium text-gray-900'>
          News feed
        </h3>
      </div>
      <div className='px-4 sm:pb-5 sm:px-6'>
      {/* <div className='px-4 py-5 sm:p-6'> */}
        <div>
          <ul className='divide-y divide-gray-200'>
            {feed.map((post) => (
              <EventFeedItem key={post.id} post={post} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
