import { useState } from "react";
import EventForm from "../eventForm/EventForm";
import EventList from "./EventList";
import { sampleData } from "../../../app/api/sampleData";

export default function EventDashboard({formOpen}, {setFormOpen}) {
  const [events, setEvents] = useState(sampleData);

  return (
    <div className='grid grid-cols-3 gap-4'>
      <div className='col-span-2'>
        <EventList events={events} />
      </div>
      <div className='col-span-1'>{formOpen && <EventForm setFormOpen = {setFormOpen} />}</div>
    </div>
  );
}
