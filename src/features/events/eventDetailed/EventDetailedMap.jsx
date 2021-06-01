import GoogleMapReact from "google-map-react";
import { LocationMarkerIcon } from "@heroicons/react/solid";

function Marker() {
  return <LocationMarkerIcon className='h-6 w-6 text-red-400' aria-hidden='true' />;
}

export default function EventDetailedMap({ latLng }) {
  const zoom = 14;
  return (
    <div className='h-72 w-full sm:rounded-b-lg'>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyB3AnYTz0YmLuMnxrWeJVEoVTdymQEc_Ow" }}
        center={latLng}
        zoom={zoom}
      >
        <Marker lat={latLng.lat} lng={latLng.lng} />
      </GoogleMapReact>
    </div>
  );
}
