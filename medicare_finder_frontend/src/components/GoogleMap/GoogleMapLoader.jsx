import { useLoadScript } from "@react-google-maps/api";

const libraries = ["places"];

const GoogleMapsLoader = ({ children }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  if (loadError) return <p>Failed to load Google Maps</p>;
  if (!isLoaded) return <p>Loading map...</p>;

  return children;
};

export default GoogleMapsLoader;
