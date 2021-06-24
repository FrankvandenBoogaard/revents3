import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  firebaseObjectToArray,
  getEventChatRef,
} from "../../../app/firestore/firebaseService";
import { listenToEventChat } from "../eventActions";
import EventDetailedChatForm from "./EventDetailedChatForm";
import { formatDistanceToNow } from "date-fns";
import { CLEAR_COMMENTS } from "../eventConstants";
import { useState } from "react";
import { createDataTree } from "../../../app/common/util/util";

export default function EventDetailedChat({ eventId, currentUser }) {
  const dispatch = useDispatch();
  const { comments } = useSelector((state) => state.event);
  const [showReplyForm, setShowReplyForm] = useState({
    open: false,
    commentId: null,
  });

  function handleCloseReplyForm() {
    setShowReplyForm({ open: false, commentId: null });
  }

  useEffect(() => {
    getEventChatRef(eventId).on("value", (snapshot) => {
      if (!snapshot.exists()) return;
      dispatch(
        listenToEventChat(firebaseObjectToArray(snapshot.val()).reverse())
      );
    });
    return () => {
      dispatch({ type: CLEAR_COMMENTS });
      getEventChatRef().off();
    };
  }, [eventId, dispatch]);

  return (
    <section aria-labelledby='notes-title'>
      <div className='bg-white shadow sm:rounded-lg sm:overflow-hidden mb-6'>
        <div className='divide-y divide-gray-200'>
          <div className='px-4 py-5 sm:px-6'>
            <h2 id='notes-title' className='text-lg font-medium text-gray-900'>
              Chat about this event
            </h2>
          </div>
          <EventDetailedChatForm
            eventId={eventId}
            currentUser={currentUser}
            parentId={0}
            closeForm={setShowReplyForm}

          />
          <div className='bg-gray-50 px-4 py-6 sm:px-6'>
            <ul className='space-y-8'>
              {createDataTree(comments).map((comment) => (
                <li key={comment.id}>
                  <div className='flex space-x-3'>
                    <Link
                      to={`/profile/${comment.uid}`}
                      className='flex-shrink-0'
                    >
                      <img
                        className='h-10 w-10 rounded-full'
                        src={comment.photoURL || "/assets/user.png"}
                        alt=''
                      />
                    </Link>
                    <div>
                      <div className='text-sm'>
                        <div className='font-medium text-gray-900'>
                          {comment.displayName}
                        </div>
                      </div>
                      <div className='mt-1 text-sm text-gray-700'>
                        <p>
                          {comment.text.split("\n").map((text, i) => (
                            <span key={i}>
                              {text}
                              <br />
                            </span>
                          ))}
                        </p>
                      </div>
                      <div className='mt-1 text-sm space-x-2'>
                        <span className='text-gray-500 font-medium'>
                          {formatDistanceToNow(comment.date)}
                        </span>{" "}
                        <span className='text-gray-500 font-medium'>
                          &middot;
                        </span>{" "}
                        <button
                          type='button'
                          className='text-gray-900 font-medium'
                          onClick={() =>
                            setShowReplyForm({
                              open: true,
                              commentId: comment.id,
                            })
                          }
                        >
                          Reply
                        </button>
                      </div>
                    </div>
                  </div>
                  {showReplyForm.open &&
                    showReplyForm.commentId === comment.id && (
                      <EventDetailedChatForm
                        eventId={eventId}
                        currentUser={currentUser}
                        parentId={comment.id}
                        closeForm={handleCloseReplyForm}
                      />
                    )}
                  {comment.childNodes.length > 0 && (
                    <div className='ml-8 mt-4'>
                      {comment.childNodes.reverse().map((child) => (
                        <li className='mt-2' key={child.id}>
                          <div className='flex space-x-3'>
                            <Link
                              to={`/profile/${child.uid}`}
                              className='flex-shrink-0'
                            >
                              <img
                                className='h-10 w-10 rounded-full'
                                src={child.photoURL || "/assets/user.png"}
                                alt=''
                              />
                            </Link>
                            <div>
                              <div className='text-sm'>
                                <div className='font-medium text-gray-900'>
                                  {child.displayName}
                                </div>
                              </div>
                              <div className='mt-1 text-sm text-gray-700'>
                                <p>
                                  {child.text.split("\n").map((text, i) => (
                                    <span key={i}>
                                      {text}
                                      <br />
                                    </span>
                                  ))}
                                </p>
                              </div>
                              <div className='mt-1 text-sm space-x-2'>
                                <span className='text-gray-500 font-medium'>
                                  {formatDistanceToNow(child.date)}
                                </span>{" "}
                                <span className='text-gray-500 font-medium'>
                                  &middot;
                                </span>{" "}
                                <button
                                  type='button'
                                  className='text-gray-900 font-medium'
                                  onClick={() =>
                                    setShowReplyForm({
                                      open: true,
                                      commentId: child.id,
                                    })
                                  }
                                >
                                  Reply
                                </button>
                              </div>
                            </div>
                          </div>
                          {showReplyForm.open &&
                            showReplyForm.commentId === child.id && (
                              <EventDetailedChatForm
                                eventId={eventId}
                                currentUser={currentUser}
                                parentId={child.parentId}
                                closeForm={handleCloseReplyForm}
                              />
                            )}
                        </li>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
