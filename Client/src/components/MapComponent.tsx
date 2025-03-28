import { useCallback, useEffect, useState } from "react";
import { MapContainer, Popup, TileLayer, useMap } from 'react-leaflet'
import { IoMdPin } from "react-icons/io";
import { Marker } from '@adamscybot/react-leaflet-component-marker'

interface MapComponentProps{
  className?: string;
  onLoad?: (b: bounds, center: coordinates, zoom: number) => void;
  onMove?: (b: bounds, center: coordinates, zoom: number) => void;
  markers?: {lat: number, lon: number, text: string}[];
  onMarkerClick?: (arg: any) => void;
  coordinates?: {lat: number, lon: number};
  zoom?: number;
}

export interface coordinates{lat: number, lon: number};
export interface bounds{ne: coordinates, sw: coordinates};

const MapComponent = ({className = "", markers, onMove, onLoad, onMarkerClick, coordinates = {lat: 40, lon: 14}, zoom = 15} : MapComponentProps) => {

  return (
    <>
      <div className={"rounded-lg overflow-hidden flex w-full h-full " + className} >
        <MapContainer center={[coordinates.lat, coordinates.lon]} zoom={zoom} className={`flex-1`}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {markers?.map((marker, index) => <Marker key={index} position={[marker.lat, marker.lon]} icon={<IoMdPin className="text-red-600" size={24} onClick={() => onMarkerClick?.(index)} />}>
              {marker.text && <Popup autoPan={false} autoClose>
                {marker.text}
              </Popup>}
          </Marker>)}
          <SetMapPosition lat={coordinates?.lat} lon={coordinates?.lon} />
          {onLoad && <OnLoad callback={onLoad} />}
          {onMove && <OnMoveListener callback={onMove} />}
        </MapContainer>
      </div>
    </>
  );
};

const SetMapPosition = ({lat, lon} : {lat?: number, lon?: number}) => {
  const map = useMap();
  useEffect(() => {
    if(lat && lon){
      map.setView([lat, lon], map.getZoom(), {animate: false});
    }
  }, [lat, lon]);

  return null;
}

const OnLoad = ({callback} : {callback: (b: bounds, center: coordinates, zoom: number) => void}) => {
  const map = useMap();
  useEffect(() => {
    if(map.getSize().x >= 0 && map.getSize().y >= 0){
      const ne = map.getBounds().getNorthEast();
      const sw = map.getBounds().getSouthWest();
      const center = map.getCenter();
      const zoom = map.getZoom();
      callback({
        ne: {lat: ne.lat, lon: ne.lng}, 
        sw: {lat: sw.lat, lon: sw.lng},
      }, {lat: center.lat, lon: center.lng}, zoom);
    }
  }, [])

  return null;
}

const OnMoveListener = ({callback} : {callback: (b: bounds, center: coordinates, zoom: number) => void}) => {
  const map = useMap();
  const [currZoom, setCurrZoom] = useState<number>(map.getZoom())

  const onMove = useCallback(() => {
    if(map.getSize().x >= 0 && map.getSize().y >= 0){
      const ne = map.getBounds().getNorthEast();
      const sw = map.getBounds().getSouthWest();
      const center = map.getCenter();
      const zoom = map.getZoom();
      callback({
        ne: {lat: ne.lat, lon: ne.lng}, 
        sw: {lat: sw.lat, lon: sw.lng},
      }, {lat: center.lat, lon: center.lng}, zoom);
    }
  }, [map])
  useEffect(() => {
    console.log("reload");
  }, [])

  useEffect(() => {
    const handleZoomStart = () => {
      setCurrZoom(map.getZoom());
    }

    const handleZoomEnd = () => {
      const newZoom = map.getZoom();
      if(currZoom && newZoom < currZoom){
        console.log("Zoom Out");
        onMove();
      }
      setCurrZoom(newZoom); // Aggiorna il livello di zoom precedente
    };

    
    map.on('dragend', onMove)
    map.on('zoomstart', handleZoomStart);
    map.on('zoomend', handleZoomEnd)
    return () => {
      map.off('dragend')
      map.off('zoomstart');
      map.off('zoomend')
    }
  }, [map, onMove, currZoom])

  return null;
}

export default MapComponent;
