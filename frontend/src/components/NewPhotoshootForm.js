import React, { useState } from "react";
import "../styles/App.css";

const NewPhotoshootForm = ({ onAddPhotoshoot, locations, onAddLocation }) => {
  const [newDate, setNewDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedLocationID, setSelectedLocationID] = useState("");
  const [newLocationName, setNewLocationName] = useState("");

  const handleAddPhotoshoot = async (e) => {
    e.preventDefault();
    if (!newDate) {
      alert("Please select a date!");
      return;
    }

    if (!selectedLocationID) {
      alert("Please select or add a location!");
      return;
    }

    setLoading(true);
    try {
      await onAddPhotoshoot(newDate, selectedLocationID);
      setNewDate("");
      setSelectedLocationID("");
    } catch (error) {
      console.error("Error adding photoshoot:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddLocation = async (e) => {
    e.preventDefault();
    if (!newLocationName) {
      alert("Please provide a name for the new location!");
      return;
    }

    setLoading(true);
    try {
      await onAddLocation(newLocationName);
      setNewLocationName(""); 
    } catch (error) {
      console.error("Error adding location:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleAddPhotoshoot} className="new-photoshoot-form">
      <h2>Create New Photoshoot</h2>
      <div className="form-row">
        <label htmlFor="photoshoot-date">Date:</label>
        <input
          type="datetime-local"
          id="photoshoot-date"
          value={newDate}
          onChange={(e) => setNewDate(e.target.value)}
        />

        <label htmlFor="photoshoot-location">Location:</label>
        <select
          id="photoshoot-location"
          value={selectedLocationID}
          onChange={(e) => setSelectedLocationID(e.target.value)}
        >
          <option value="">Select a location</option>
          {locations.map((location) => (
            <option key={location.locationID} value={location.locationID}>
              {location.name}
            </option>
          ))}
        </select>

        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Submit"}
        </button>
      </div>

      <div className="add-new-location">
        <h3>Add a New Location</h3>
        <input
          type="text"
          placeholder="New location name"
          value={newLocationName}
          onChange={(e) => setNewLocationName(e.target.value)}
        />
        <button onClick={handleAddLocation} disabled={loading}>
          {loading ? "Adding..." : "Add Location"}
        </button>
      </div>
    </form>
  );
};

export default NewPhotoshootForm;
