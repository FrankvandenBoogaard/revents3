import EventList from "./EventList";
import { useDispatch, useSelector } from "react-redux";
import EventListItemPlaceholder from "./EventListItemPlaceholder";
import EventFilters from "./EventFilters";
import useFirestoreCollection from "../../../app/hooks/useFireStoreCollection";
import { listenToEventsFromFirestore } from "../../../app/firestore/firestoreService";
import { listenToEvents } from "../eventActions";

export default function EventDashboard() {
  const dispatch = useDispatch();
  const { events } = useSelector((state) => state.event);
  const { loading } = useSelector((state) => state.async);

  useFirestoreCollection({
    query: () => listenToEventsFromFirestore(),
    data: (events) => dispatch(listenToEvents(events)),
    deps: [dispatch],
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
        <EventFilters />
      </div>
    </div>
  );
}
