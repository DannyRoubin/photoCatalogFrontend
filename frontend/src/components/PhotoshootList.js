import React from 'react';
import { useNavigate } from 'react-router-dom';
import Grid2 from '@mui/material/Grid2';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import '../styles/App.css';

const PhotoshootList = ({ photoshoots, locations }) => {
  const navigate = useNavigate();

  const handlePhotoshootClick = (photoshootID) => {
    navigate(`/photoshoot/${photoshootID}`);
  };

  const photoshootItems = photoshoots.length === 0 ? (
    <Grid2 xs={12}>
      <Typography variant="body1">No photoshoots available.</Typography>
    </Grid2>
  ) : (
    photoshoots.map((photoshoot) => {
      const location = locations.find(loc => loc.locationID === photoshoot.locationID);
      const locationName = location ? location.name : "Unknown Location";

      return (
        <Grid2
          xs={12}
          sm={6}
          md={4}
          key={photoshoot.photoshootID}
          onClick={() => handlePhotoshootClick(photoshoot.photoshootID)}
          style={{ cursor: 'pointer' }}
        >
          <Card variant="outlined" className="photoshoot-card">
            <CardContent>
              <Typography variant="h6">Photoshoot #{photoshoot.photoshootID}</Typography>
              <Typography variant="body2">Date: {photoshoot.date}</Typography>
              <Typography variant="body2">Location: {locationName}</Typography>
            </CardContent>
          </Card>
        </Grid2>
      );
    })
  );

  return (
    <div className="existing-photoshoots">
      <h2>Existing Photoshoots</h2>
      <Grid2 container spacing={2} justifyContent="center">
        {photoshootItems}
      </Grid2>
    </div>
  );
};

export default PhotoshootList;
