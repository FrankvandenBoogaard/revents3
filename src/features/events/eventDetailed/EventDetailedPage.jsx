import EventDetailedHeader from "./EventDetailedHeader";
import EventDetailedInfo from "./EventDetailedInfo";
import EventDetailedChat from "./EventDetailedChat";
import EventDetailedSidebar from "./EventDetailedSidebar";
import { useDispatch, useSelector } from "react-redux";
import useFirestoreDoc from "../../../app/hooks/useFirestoreDoc";
import { listenToEventFromFirestore } from "../../../app/firestore/firestoreService";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { Redirect } from "react-router";
import { listenToSelectedEvent } from "../eventActions";

export default function EventDetailedPage({ match }) {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);
  const { loading, error } = useSelector((state) => state.async);
  const event = useSelector((state) => state.event.selectedEvent);
  const isHost = event?.hostUid === currentUser.uid;
  const isGoing = event?.attendees?.some((a) => a.id === currentUser.uid);

  useFirestoreDoc({
    query: () => listenToEventFromFirestore(match.params.id),
    data: (event) => dispatch(listenToSelectedEvent(event)),
    deps: [match.params.id, dispatch],
  });

  if (loading || (!event && !error))
    return <LoadingComponent content='Loading event...' />;

  if (error) return <Redirect to='/error' />;

  return (
    <div className='max-w-3xl mx-auto grid grid-cols-1 gap-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3'>
      <div className='space-y-6 lg:col-start-1 lg:col-span-2'>
        {/* Description list*/}
        <section aria-labelledby='applicant-information-title'>
          <div className='bg-white shadow sm:rounded-lg'>
            <EventDetailedHeader
              event={event}
              isGoing={isGoing}
              isHost={isHost}
            />
            <EventDetailedInfo event={event} />
          </div>
        </section>
        {/* Comments*/}
        <EventDetailedChat eventId={event.id} currentUser={currentUser} />
      </div>
      <EventDetailedSidebar
        attendees={event?.attendees}
        hostUid={event.hostUid}
      />
    </div>
  );
}
