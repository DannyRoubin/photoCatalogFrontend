import axios from 'axios';
import Photoshoot from '../models/Photoshoot';
import Photo from '../models/Photo';

// Get all photoshoots
export async function getAllPhotoshoots() {
  try {
    const response = await axios.get("http://localhost:8080/photoshoot");
    if (response.status !== 200) {
      console.log(`${response.status} - ${response.statusText}`);
    }
    return response.data.map(photoshoot => new Photoshoot(photoshoot.photoshootID, photoshoot.date, photoshoot.locationID));
  } catch (error) {
    console.log("Error fetching photoshoots:", error);
  }
}

// Get a specific photoshoot by ID
export async function getPhotoshootById(id) {
  try {
    const response = await axios.get(`http://localhost:8080/photoshoot/${id}`);
    if (response.status !== 200) {
      console.log(`${response.status} - ${response.statusText}`);
    }
    const { photoshootID, date, locationID } = response.data;
    return new Photoshoot(photoshootID, date, locationID);
  } catch (error) {
    console.log("Error fetching photoshoot:", error);
  }
}

// Make a new photoshoot with a location
export async function addPhotoshoot(date, locationID) {
  try {
    const response = await axios.post("http://localhost:8080/photoshoot", {
      locationID: locationID, 
      date: date,
    });
    if (response.status !== 200) {
      console.log(`${response.status} - ${response.statusText}`);
    }
    const { photoshootID } = response.data;
    return new Photoshoot(photoshootID, date, locationID);
  } catch (error) {
    console.log("Error creating photoshoot:", error);
  }
}

// Add a photo to a photoshoot using the photoGUID
export async function addPhotoToPhotoshoot(photoshootID, photoGUID) {
  try {
    const response = await axios.post(`http://localhost:8080/photoshoot/${photoshootID}/addPhoto/${photoGUID}`);
    if (response.status !== 200) {
      console.log(`${response.status} - ${response.statusText}`);
    }
  } catch (error) {
    console.log("Error adding photo to photoshoot:", error);
  }
}

// Get all photos for a specific photoshoot
export async function getAllPhotosForPhotoshoot(photoshootID) {
  try {
    const response = await axios.get(`http://localhost:8080/photoshoot/${photoshootID}/photo`);
    if (response.status !== 200) {
      console.log(`${response.status} - ${response.statusText}`);
    }
    return response.data.map(photo => new Photo(photo.photoID, photo.photoGUID, photo.fileName, photo.timeStamp));
  } catch (error) {
    console.log("Error grabbing photos for photoshoot:", error);
  }
}
