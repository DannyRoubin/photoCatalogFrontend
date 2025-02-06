import axios from 'axios';
import Photo from '../models/Photo';

export async function getPhotoById(id) {
  try {
    const res = await axios.get(`https://photocatalog-cugzb9fpc3f9dggy.westus-01.azurewebsites.net/photo/${id}`);
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
    // First, send metadata to backend to get photoID and photoGUID
    const backendResponse = await axios.post("https://photocatalog-cugzb9fpc3f9dggy.westus-01.azurewebsites.net/photo", {
      fileName: fileName,
      timeStamp: imageDate,
    });

    if (backendResponse.status === 200) {
      const { photoID, photoGUID } = backendResponse.data;

      // Convert selected image to raw binary data
      const imageBlob = selectedImage;
      const imageArrayBuffer = await imageBlob.arrayBuffer();
      const imageBytes = new Uint8Array(imageArrayBuffer);

      // Send raw image bytes as body, pass ID and GUID as query parameters
      const functionAppResponse = await axios.post(
        `https://photocatalogfunctionapp.azurewebsites.net/api/process-image?code=j6UJk-tb4DZ9R1jmQwYScr2EURlnvgIe3R8h1uPUxFnAAzFu_Wp2Wg%3D%3D&photoID=${photoID}&photoGUID=${photoGUID}`,
        imageBytes, // Send raw bytes directly
        {
          headers: {
            "Content-Type": "application/octet-stream", // Indicate binary data
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
  // try {
  //   const response = await axios.get(`http://localhost:8081/api/image/${photoGUID.toLowerCase()}`, {
  //     responseType: 'blob', 
  //   });
  //   return URL.createObjectURL(response.data);
  // } catch (error) {
  //   console.error('Error fetching image:', error);
  //   return null;
  // }

  try {
    const response = await axios.get(`https://photocatalogfunctionapp.azurewebsites.net/api/image/${photoGUID.toLowerCase()}?code=wQz2BCJMjMS42luswQmu-zm_ZXsI16iNLGBd4Y7jWQshAzFualffdw%3D%3D`, {
      responseType: 'blob',
    });
    return URL.createObjectURL(response.data);
  } catch (error) {
    console.error('Error fetching image:', error);
    return null;
  }



}

