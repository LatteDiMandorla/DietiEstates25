import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LatLngExpression } from "leaflet";
import '@geoapify/geocoder-autocomplete/styles/minimal.css';
import {
  GeoapifyGeocoderAutocomplete,
  GeoapifyContext
} from '@geoapify/react-geocoder-autocomplete';

const MapComponent: React.FC = () => {
  const geoapifyApiKey = "5f915e0c5501410a8ac26dd8d67aae97"; // Sostituisci con la tua chiave API
  const defaultPosition : LatLngExpression = [45.4642, 9.19]; // Milano, come esempio
    const map = useMap();
  const [location, setLocation] = useState<{lat: number, lon: number}>();

  return (
    <>
    </>
  );
};

export default MapComponent;
