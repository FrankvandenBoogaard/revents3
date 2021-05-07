import { useState } from "react";
import EventDashboard from "../../features/events/eventDashboard/EventDashboard";
import NavBar from "../../features/events/nav/NavBar";
import "./App.css";

export default function App() {
  const [formOpen, setFormOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  function handleSelectEvent(event) {
    setSelectedEvent(event);
    setFormOpen(true);
  }

  function handleCreateFormOpen() {
    setSelectedEvent(null);
    setFormOpen(true);
  }

  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 bg-gray-100'>
      <NavBar setFormOpen={handleCreateFormOpen} />
      <EventDashboard
        formOpen={formOpen}
        setFormOpen={setFormOpen}
        selectEvent={handleSelectEvent}
        selectedEvent={selectedEvent}
      />
    </div>
  );
}
