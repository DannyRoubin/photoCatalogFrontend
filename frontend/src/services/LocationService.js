import axios from "axios";
import Location from "../models/Location";

export async function getAllLocations() {
  try {
    const res = await axios.get("http://localhost:8080/location");
    if (res.status !== 200) {
      throw new Error(`Network response was not ok: ${res.status} - ${res.statusText}`);
    }
    return res.data.map((location) => new Location(location.locationID, location.locationName));
  } catch (error) {
    console.error("Error fetching locations:", error);
    throw new Error(`Error fetching locations: ${error.message}`);
  }
}

export async function getLocationById(id) {
    try {
      const res = await axios.get(`http://localhost:8080/location/${id}`);
      if (res.status !== 200) {
        throw new Error(`Network response was not ok: ${res.status} - ${res.statusText}`);
      }
      const locationData = res.data;
      return new Location(locationData.locationID, locationData.locationName);
    } catch (error) {
      console.error(`Error fetching location with ID ${id}:`, error);
      throw new Error(`Error fetching location with ID ${id}: ${error.message}`);
    }
  }

export async function addLocation(newLocation) {
  try {
    const res = await axios.post("http://localhost:8080/location", {
      locationName: newLocation,
    });
    if (res.status !== 200) {
      throw new Error(`Network response was not ok: ${res.status} - ${res.statusText}`);
    }
    const locationData = res.data;
    return new Location(locationData.locationID, locationData.locationName);
  } catch (error) {
    console.error("Error adding location:", error);
    throw new Error(`Error adding location: ${error.message}`);
  }
}


