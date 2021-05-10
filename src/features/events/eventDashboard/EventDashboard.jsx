import { useState } from "react";
import EventList from "./EventList";
import { sampleData } from "../../../app/api/sampleData";

export default function EventDashboard() {
  const [events, setEvents] = useState(sampleData);

  // function handleCreateEvent(event) {
  //   setEvents([...events, event]);
  // }

  // function handleUpdateEvent(updatedEvent) {
  //   setEvents(
  //     events.map((evt) => (evt.id === updatedEvent.id ? updatedEvent : evt))
  //   );
  //   selectEvent(null);
  // }

  function handleDeleteEvent(eventId) {
    setEvents(events.filter((evt) => evt.id !== eventId));
  }

  return (
    <div className='grid grid-cols-3 gap-4'>
      <div className='col-span-2'>
        <EventList
          events={events}
          deleteEvent={handleDeleteEvent}
        />
      </div>
      <div className='col-span-1'>
        <h2>Event Filters</h2>
      </div>
    </div>
  );
}
