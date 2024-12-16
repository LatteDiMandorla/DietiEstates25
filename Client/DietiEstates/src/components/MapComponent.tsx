import axios from "axios";
import React, { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'

const MapComponent: React.FC = () => {
  const [coordinates, setCoordinates] = useState<{lat: number, lon: number}>({lat: 12, lon: 120});

  return (
    <>

      <div>
        <MapContainer center={[coordinates?.lat, coordinates?.lon]} zoom={10} className="h-96 w-96">
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={[-22, 120]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
          <SetSearchCoordinates lat={coordinates.lat} lon={coordinates.lon}  />
        </Marker>
        </MapContainer>
      </div>
    </>
  );
};

const SetSearchCoordinates = ({lat, lon} : any) => {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lon]);
  }, [lat, lon]);

  return null;
}

export default MapComponent;
