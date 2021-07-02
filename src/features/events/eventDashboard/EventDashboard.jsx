import EventList from "./EventList";
import { useDispatch, useSelector } from "react-redux";
import EventListItemPlaceholder from "./EventListItemPlaceholder";
import EventFilters from "./EventFilters";
import { clearEvents, fetchEvents } from "../eventActions";
import { useState } from "react";
import EventsFeed from "./EventsFeed";
import { useEffect } from "react";

export default function EventDashboard() {
  const limit = 2;
  const dispatch = useDispatch();
  const { events, moreEvents } = useSelector((state) => state.event);
  const { loading } = useSelector((state) => state.async);
  const { authenticated } = useSelector((state) => state.auth);
  const [lastDocSnapshot, setLastDocSnapshot] = useState(null);
  const [loadingInitial, setLoadingInitial] = useState(false);
  const [predicate, setPredicate] = useState(
    new Map([
      ["startDate", new Date()],
      ["filter", "all"],
    ])
  );

  function handleSetPredicate(key, value) {
    dispatch(clearEvents());
    setLastDocSnapshot(null);
    setPredicate(new Map(predicate.set(key, value)));
  }

  useEffect(() => {
    setLoadingInitial(true);
    dispatch(fetchEvents(predicate, limit)).then((lastVisible) => {
      setLastDocSnapshot(lastVisible);
      setLoadingInitial(false);
    });
    return () => {
      dispatch(clearEvents());
    };
  }, [dispatch, predicate]);

  function handleFetchNextEvents() {
    dispatch(fetchEvents(predicate, limit, lastDocSnapshot)).then(
      (lastVisible) => {
        setLastDocSnapshot(lastVisible);
      }
    );
  }

  return (
    <div className='grid grid-cols-3 gap-4'>
      <div className='col-span-2'>
        {loadingInitial && (
          <>
            <EventListItemPlaceholder />
            <EventListItemPlaceholder />
          </>
        )}
        <EventList
          events={events}
          getNextEvents={handleFetchNextEvents}
          loading={loading}
          moreEvents={moreEvents}
        />
        {loading && <EventListItemPlaceholder />}
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
