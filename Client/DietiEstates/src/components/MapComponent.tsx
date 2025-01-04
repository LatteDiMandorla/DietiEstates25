import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'

const MapComponent = ({className = ""} : {className?: string, width?: string}) => {
  const [coordinates, setCoordinates] = useState<{lat: number, lon: number}>({lat: 12, lon: 120});

  useEffect(() => {
    if(localStorage.getItem("startCoordinates")){
      const c = JSON.parse(localStorage.getItem("startCoordinates") || "");
      setCoordinates({lat: c.lat, lon: c.lon});
    }
  }, [])
  return (
    <>
      <div className={"rounded-lg overflow-hidden flex w-full h-full " + className} >
        <MapContainer center={[coordinates?.lat, coordinates?.lon]} zoom={15} className={`flex-1`}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={[coordinates?.lat, coordinates?.lon]}>
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
