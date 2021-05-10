import EventList from "./EventList";
import { useSelector } from "react-redux";

export default function EventDashboard() {
  const { events } = useSelector((state) => state.event);

  return (
    <div className='grid grid-cols-3 gap-4'>
      <div className='col-span-2'>
        <EventList events={events} />
      </div>
      <div className='col-span-1'>
        <h2>Event Filters</h2>
      </div>
    </div>
  );
}
