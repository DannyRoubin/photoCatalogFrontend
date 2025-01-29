import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllPhotoshoots } from "../services/photoshootService";
import { getAllLocations } from "../services/LocationService";
import PhotoshootList from "../components/PhotoshootList";
import "../styles/App.css";

function HomePage() {
  const navigate = useNavigate();
  const [photoshoots, setPhotoshoots] = useState([]);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    fetchPhotoshoots();
    fetchLocations();
  }, []);

  async function fetchPhotoshoots() {
    try {
      const data = await getAllPhotoshoots();
      setPhotoshoots(data); 
    } catch (error) {
      console.error("Error grabbing photoshoots:", error);
    }
  }

  async function fetchLocations() {
    try {
      const data = await getAllLocations();
      setLocations(data); 
    } catch (error) {
      console.error("Error grabbing locations:", error);
    }
  }

  return (
    <div className="homepage-container">
      <h1>Photoshoots</h1>
      <PhotoshootList photoshoots={photoshoots} locations={locations}/>
      <button className="add-photoshoot-button" onClick={() => navigate("/new-photoshoot")}>
        Add Photoshoot
      </button>
    </div>
  );
}

export default HomePage;
