import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllLocations, addLocation } from "../services/LocationService";
import { addPhotoshoot } from "../services/photoshootService";
import NewPhotoshootForm from "../components/NewPhotoshootForm";

const NewPhotoshootPage = () => {
  const navigate = useNavigate();
  const [locations, setLocations] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    fetchLocations();
  }, []);

  async function fetchLocations() {
    try {
      const data = await getAllLocations();
      setLocations(data);
    } catch (error) {
      console.error("Error fetching locations:", error);
    }
  }

  const handleAddPhotoshoot = async (date, locationID) => {
    try {
      await addPhotoshoot(date, locationID);
      setSuccessMessage("Photoshoot created successfully!");
      fetchLocations();
    } catch (error) {
      console.error("Error adding photoshoot:", error);
    }
  };

  const handleAddLocation = async (name) => {
    try {
      await addLocation(name);
      fetchLocations();
    } catch (error) {
      console.error("Error adding location:", error);
    }
  };

  return (
    <div className="photoshoot-page-container">
      {successMessage && <p className="success-message">{successMessage}</p>}
      <NewPhotoshootForm
        onAddPhotoshoot={handleAddPhotoshoot}
        locations={locations}
        onAddLocation={handleAddLocation}
      />
      <button onClick={() => navigate("/")}>Back to Home</button>
    </div>
  );
};

export default NewPhotoshootPage;
