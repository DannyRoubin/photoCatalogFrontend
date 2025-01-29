import axios from 'axios';
import Photo from '../models/Photo';

export async function getPhotoById(id) {
  try {
    const res = await axios.get(`http://localhost:8080/photo/${id}`);
    if (res.status !== 200) {
      throw new Error(`Network response was not ok: ${res.status} - ${res.statusText}`);
    }
    const { photoID, photoGUID, fileName, timeStamp } = res.data;
    return new Photo(photoID, photoGUID, fileName, timeStamp);
  } catch (error) {
    console.error('Error fetching photo:', error);
    throw new Error(`Error fetching photo: ${error.message}`);
  }
}

export async function sendPostRequest(fileName, selectedImage, imageDate) {
  try {
    const backendResponse = await axios.post("http://localhost:8080/photo", {
      fileName: fileName,
      timeStamp: imageDate,
    });

    if (backendResponse.status === 200) {
      const { photoID, photoGUID } = backendResponse.data;
      const ImageData = new FormData();
      ImageData.append("photoID", photoID);
      ImageData.append("photoGUID", photoGUID);
      ImageData.append("file", selectedImage);

      const functionAppResponse = await axios.post(
        "http://localhost:8081/api/process-image",
        ImageData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Function app response:", functionAppResponse.data);

      return new Photo(photoID, photoGUID, fileName, imageDate);
    } else {
      throw new Error(`Unexpected backend response status: ${backendResponse.status}`);
    }
  } catch (error) {
    console.log("Error in sendPostRequest:", error);
  }
}

export async function getImageByGUID(photoGUID) {
  try {
    const response = await axios.get(`http://localhost:8081/api/image/${photoGUID.toLowerCase()}`, {
      responseType: 'blob', 
    });
    return URL.createObjectURL(response.data);
  } catch (error) {
    console.error('Error fetching image:', error);
    return null;
  }
}

