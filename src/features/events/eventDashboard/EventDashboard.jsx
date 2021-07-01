import EventList from "./EventList";
import { useDispatch, useSelector } from "react-redux";
import EventListItemPlaceholder from "./EventListItemPlaceholder";
import EventFilters from "./EventFilters";
import useFirestoreCollection from "../../../app/hooks/useFireStoreCollection";
import { listenToEventsFromFirestore } from "../../../app/firestore/firestoreService";
import { listenToEvents } from "../eventActions";
import { useState } from "react";
import EventsFeed from "./EventsFeed";

export default function EventDashboard() {
  const dispatch = useDispatch();
  const { events } = useSelector((state) => state.event);
  const { loading } = useSelector((state) => state.async);
  const { authenticated } = useSelector((state) => state.auth);
  const [predicate, setPredicate] = useState(
    new Map([
      ["startDate", new Date()],
      ["filter", "all"],
    ])
  );

  function handleSetPredicate(key, value) {
    setPredicate(new Map(predicate.set(key, value)));
  }

  useFirestoreCollection({
    query: () => listenToEventsFromFirestore(predicate),
    data: (events) => dispatch(listenToEvents(events)),
    deps: [dispatch, predicate],
  });

  return (
    <div className='grid grid-cols-3 gap-4'>
      <div className='col-span-2'>
        {loading && (
          <>
            <EventListItemPlaceholder />
            <EventListItemPlaceholder />
          </>
        )}
        <EventList events={events} />
      </div>
      <div className='col-span-1'>
        {authenticated && <EventsFeed />}
        <EventFilters
          predicate={predicate}
          setPredicate={handleSetPredicate}
          loading={loading}
        />
      </div>
    </div>
  );
}
