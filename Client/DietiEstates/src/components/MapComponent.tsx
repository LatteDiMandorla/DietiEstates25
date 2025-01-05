import { useCallback, useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import { useSearchParams } from "react-router-dom";

const MapComponent = ({className = "", onMove, markers} : {className?: string, onMove?: (arg: any) => Promise<void>, markers?: {lat: number, lon: number, text: string}[]}) => {
  const [coordinates, setCoordinates] = useState<{lat: number, lon: number}>({lat: 40.827373, lon: 14.191577});
  const [bounds, setBounds] = useState<{ne: {lat: number, lon: number}, sw: {lat: number, lon: number}}>();
  const [params] = useSearchParams();
  const lat = params.get("lat");
  const lon = params.get("lon");

  useEffect(() => {
    const lt = parseFloat(lat || "");
    const ln = parseFloat(lon || "");
    if(lt && ln){
      setCoordinates({lat: lt, lon: ln});
    }
  }, [lat, lon])

  useEffect(() => {
    onMove?.(bounds);
  }, [bounds]);
  return (
    <>
      <div className={"rounded-lg overflow-hidden flex w-full h-full " + className} >
        <MapContainer center={[coordinates?.lat, coordinates?.lon]} zoom={13} className={`flex-1`}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {markers?.map((marker, index) => <Marker key={index} position={[marker.lat, marker.lon]}>
            <Popup>
              {marker.text}
            </Popup>  
          </Marker>)}
          <SetSearchCoordinates lat={coordinates.lat} lon={coordinates.lon}  />
          <GetSearchCoordinates setPosition={setBounds} />
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

const GetSearchCoordinates = ({setPosition} : {setPosition: ({ne, sw} : {ne: {lat: number, lon: number}, sw: {lat: number, lon: number}}) => void}) => {
  const map = useMap();
  const onMove = useCallback(() => {
    console.log(map.getBounds());
    setPosition({ne: {lat: map.getBounds().getNorthEast().lat, lon: map.getBounds().getNorthEast().lng}, sw: {lat: map.getBounds().getSouthWest().lat, lon: map.getBounds().getSouthWest().lng}})
  }, [map])

  useEffect(() => {
    map.on('moveend', onMove)
    return () => {
      map.off('moveend', onMove)
    }
  }, [map, onMove])

  return null;
}

export default MapComponent;
