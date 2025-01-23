import { useCallback, useEffect, useState } from "react";
import { MapContainer, Popup, TileLayer, useMap } from 'react-leaflet'
import { useSearchParams } from "react-router-dom";
import { IoMdPin } from "react-icons/io";
import { Marker } from '@adamscybot/react-leaflet-component-marker'

interface MapComponentProps{
  className?: string;
  onMove?: (arg: any) => void;
  markers?: {lat: number, lon: number, text: string}[];
  onMarkerClick?: (arg: any) => void;
}

const MapComponent = ({className = "", markers, onMarkerClick} : MapComponentProps) => {
  const [coordinates, setCoordinates] = useState<{lat: number, lon: number}>();
  const [bounds, setBounds] = useState<{ne: {lat: number, lon: number}, sw: {lat: number, lon: number}}>();
  const [params, setParams] = useSearchParams();
  const lat = params.get("lat");
  const lon = params.get("lon");
  const zoom = params.get("zoom");

  useEffect(() => {
    const lt = parseFloat(lat || "40.827373");
    const ln = parseFloat(lon || "14.191577");
    if(lt && ln){
      setCoordinates({lat: lt, lon: ln});
    }

  }, [lat, lon])

  useEffect(() => {
    if(bounds && bounds.ne.lat - bounds.sw.lat > 0 && bounds.ne.lon - bounds.sw.lon > 0){
      //onMove?.(bounds);
    }
  }, [bounds]);
  return (
    <>
      <div className={"rounded-lg overflow-hidden flex w-full h-full " + className} >
        <MapContainer center={[coordinates?.lat || 40.827373, coordinates?.lon || 14.191577]} zoom={(zoom && parseInt(zoom)) || 13} className={`flex-1`}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {markers?.map((marker, index) => <Marker key={index} position={[marker.lat, marker.lon]} icon={<IoMdPin className="text-red-600" size={24} onClick={() => onMarkerClick?.(index)} />}>
              <Popup autoPan={false} autoClose>
                {marker.text}
              </Popup>
          </Marker>)}
          <SetSearchCoordinates lat={coordinates?.lat} lon={coordinates?.lon} setBounds={setBounds} />
          <GetSearchCoordinates setPosition={setBounds} setParams={setParams} params={params} />
        </MapContainer>
      </div>
    </>
  );
};

const SetSearchCoordinates = ({lat, lon, setBounds} : any) => {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lon], map.getZoom(), {animate: false});
    setBounds({ne: {lat: map.getBounds().getNorthEast().lat, lon: map.getBounds().getNorthEast().lng}, sw: {lat: map.getBounds().getSouthWest().lat, lon: map.getBounds().getSouthWest().lng}})
  }, [lat, lon]);

  return null;
}

const GetSearchCoordinates = ({setParams} : {setPosition: ({ne, sw} : {ne: {lat: number, lon: number}, sw: {lat: number, lon: number}}) => void, setParams: any, params: any}) => {
  const map = useMap();
  const onMove = useCallback(() => {
    if(map.getSize().x >= 0 && map.getSize().y >= 0){
      setParams((prev : URLSearchParams) => {
        const copy = new URLSearchParams(prev);
        copy.set('lat', map.getCenter().lat.toString());
        copy.set('lon', map.getCenter().lng.toString());
        copy.set('zoom', map.getZoom().toString());
        return copy;
      });
      //setPosition({ne: {lat: map.getBounds().getNorthEast().lat, lon: map.getBounds().getNorthEast().lng}, sw: {lat: map.getBounds().getSouthWest().lat, lon: map.getBounds().getSouthWest().lng}})
    }
  }, [map])

  useEffect(() => {
    map.on('dragend', onMove)
    map.on('zoomend', onMove)
    return () => {
      map.off('dragend', onMove)
      map.off('zoomend', onMove)
    }
  }, [map, onMove])

  return null;
}

export default MapComponent;
