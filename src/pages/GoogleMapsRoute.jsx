import { useState } from 'react';
import { Box, Button } from '@chakra-ui/react';
import { GoogleMap, LoadScript, Marker, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px'
};

const center = {
  lat: -3.745,
  lng: -38.523
};

const GoogleMapsRoute = () => {
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [response, setResponse] = useState(null);

  const directionsCallback = (response) => {
    if (response !== null) {
      if (response.status === 'OK') {
        setResponse(response);
      } else {
        console.log('response: ', response);
      }
    }
  };

  const handleMapClick = (event) => {
    if (!origin) {
      setOrigin({ lat: event.latLng.lat(), lng: event.latLng.lng() });
    } else if (!destination) {
      setDestination({ lat: event.latLng.lat(), lng: event.latLng.lng() });
    }
  };

  const handleReset = () => {
    setOrigin(null);
    setDestination(null);
    setResponse(null);
  };

  return (
    <Box>
      <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
          onClick={handleMapClick}
        >
          {origin && <Marker position={origin} />}
          {destination && <Marker position={destination} />}
          {origin && destination && (
            <DirectionsService
              options={{
                destination: destination,
                origin: origin,
                travelMode: 'DRIVING'
              }}
              callback={directionsCallback}
            />
          )}
          {response && (
            <DirectionsRenderer
              options={{
                directions: response
              }}
            />
          )}
        </GoogleMap>
      </LoadScript>
      <Button onClick={handleReset} mt={4}>Reset</Button>
    </Box>
  );
};

export default GoogleMapsRoute;