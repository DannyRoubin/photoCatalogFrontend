import React, { useState, useEffect } from 'react';
import Grid2 from '@mui/material/Grid2';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import '../styles/App.css';

const PhotoList = ({ photos, fetchImage }) => {
  const [imageURLs, setImageURLs] = useState({});

  useEffect(() => {
    const loadImages = async () => {
      const urls = {};
      for (const photo of photos) {
        const imageUrl = await fetchImage(photo.photoGUID);
        if (imageUrl) {
          urls[photo.photoGUID] = imageUrl;
        }
      }
      setImageURLs(urls);
    };

    if (photos.length > 0) {
      loadImages();
    }
  }, [photos, fetchImage]);

  return (
    <div className="photos">
      <h2>Existing Images</h2>
      <Grid2 container spacing={2} justifyContent="center">
        {photos.length === 0 ? (
          <Grid2 xs={12}>
            <Typography variant="body1">No images found for this photoshoot.</Typography>
          </Grid2>
        ) : (
          photos.map((photo) => (
            <Grid2 xs={12} sm={6} md={4} key={photo.photoGUID}>
              <Card variant="outlined" className="photo-card">
                <CardContent>
                  <Typography variant="body2">File Name: {photo.fileName}</Typography>
                  {imageURLs[photo.photoGUID] && (
                    <img
                      src={imageURLs[photo.photoGUID]}
                      alt={photo.fileName}
                      className="photo-image"
                    />
                  )}
                </CardContent>
              </Card>
            </Grid2>
          ))
        )}
      </Grid2>
    </div>
  );
};

export default PhotoList;
