import React, { useState } from 'react';
import '../styles/App.css';

const ImageUploadForm = ({ onUpload }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedImage) {
      alert("Please select an image to upload.");
      return;
    }

    setLoading(true);
    try {
      await onUpload(selectedImage);
      setSelectedImage(null);
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleUpload} className="upload-form">
      <h2>Upload and Process Image</h2>
      <input type="file" onChange={handleFileChange} />
      <button type="submit" disabled={loading}>
        {loading ? "Uploading..." : "Submit"}
      </button>
    </form>
  );
};

export default ImageUploadForm;