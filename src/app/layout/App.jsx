import { useState } from "react";
import EventDashboard from "../../features/events/eventDashboard/EventDashboard";
import NavBar from "../../features/events/nav/NavBar";
import "./App.css";

export default function App() {
  const [formOpen, setFormOpen] = useState(false);

  return (
      <div className='max-w-7xl mx-auto px-4 sm:px-6 bg-gray-100'>
        <NavBar setFormOpen={setFormOpen} />
        <EventDashboard formOpen={formOpen} setFormOpen={setFormOpen} />
      </div>
  );
}
