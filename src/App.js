import React, { useState } from "react";
import "./App.css";

const initialEvents = [
  {
    id: 1,
    title: "International Student Meetup",
    category: "Social",
    date: "2025-07-30",
    location: "Student Union Room 203",
    description: "Meet other international students in a casual setting."
  },
  {
    id: 2,
    title: "Resume Workshop",
    category: "Academic",
    date: "2025-08-01",
    location: "Career Center",
    description: "Resume tips and review by career center staff."
  }
];

function App() {
  const [events, setEvents] = useState(initialEvents);
  const [filters, setFilters] = useState({ category: "", date: "", location: "" });
  const [formData, setFormData] = useState({
    title: "",
    category: "Social",
    date: "",
    location: "",
    description: ""
  });

  const filteredEvents = events.filter((event) => {
    const matchCategory = filters.category ? event.category === filters.category : true;
    const matchDate = filters.date ? event.date === filters.date : true;
    const matchLocation = filters.location
      ? event.location.toLowerCase().includes(filters.location.toLowerCase())
      : true;
    return matchCategory && matchDate && matchLocation;
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEvent = { ...formData, id: Date.now() };
    setEvents([newEvent, ...events]);
    setFormData({ title: "", category: "Social", date: "", location: "", description: "" });
  };

  return (
    <div className="container">
      <h1 className="title">FSU Campus Events</h1>

      <div className="filters">
        <input name="location" placeholder="Filter by location" onChange={handleFilterChange} />
        <input type="date" name="date" onChange={handleFilterChange} />
        <select name="category" onChange={handleFilterChange}>
          <option value="">All Categories</option>
          <option value="Social">Social</option>
          <option value="Academic">Academic</option>
          <option value="Club">Club</option>
        </select>
      </div>

      <div className="event-list">
        {filteredEvents.length === 0 && <p>No events found.</p>}
        {filteredEvents.map((event) => (
          <div className="event-card" key={event.id}>
            <h2>{event.title}</h2>
            <p className="event-meta">{event.date} | {event.category} | {event.location}</p>
            <p>{event.description}</p>
          </div>
        ))}
      </div>

      <form className="event-form" onSubmit={handleSubmit}>
        <h2>Submit a New Event</h2>
        <input name="title" placeholder="Event Title" value={formData.title} onChange={handleInputChange} required />
        <select name="category" value={formData.category} onChange={handleInputChange}>
          <option value="Social">Social</option>
          <option value="Academic">Academic</option>
          <option value="Club">Club</option>
        </select>
        <input type="date" name="date" value={formData.date} onChange={handleInputChange} required />
        <input name="location" placeholder="Location" value={formData.location} onChange={handleInputChange} required />
        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleInputChange} required></textarea>
        <button type="submit">Submit Event</button>
      </form>
    </div>
  );
}

export default App;