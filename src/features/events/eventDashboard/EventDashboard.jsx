import EventList from "./EventList";
import { useSelector } from "react-redux";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import EventListItemPlaceholder from "./EventListItemPlaceholder";
import EventFilters from "./EventFilters";

export default function EventDashboard() {
  const { events } = useSelector((state) => state.event);
  const { loading } = useSelector((state) => state.async);

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
