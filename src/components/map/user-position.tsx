'use client';

import * as actions from '@/actions';
import {
  GoogleMap,
  Marker as GoogleMapMarker,
  useLoadScript,
} from "@react-google-maps/api";
import { useSession } from 'next-auth/react';
import { useState } from "react";
import { useFormState } from "react-dom";
import FormButton from '../common/form-button';

const API_KEY = process.env.NEXT_PUBLIC_MAPS_API_KEY;

export default function MapUserPosition({initialLocation}: {initialLocation: google.maps.LatLngLiteral | null}) {
  const session = useSession();
  const [initialCenter, setInitialCenter] = useState(
    { lat: 46.7772, lng: 2.2 }); // Center on France whole visible
  const [location, setLocation] = useState<google.maps.LatLngLiteral | null>(initialLocation || null);
  const [formState, action] = useFormState(actions.updateUserLocation.bind(null, location), {
    errors: {}
  });
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: API_KEY as string,
  });

  const [markerPosition, setMarkerPosition] = useState<google.maps.LatLngLiteral | null>
  (initialLocation || null)

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading...</div>;

  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    if (!event.latLng) return;
    setMarkerPosition(event.latLng.toJSON());
    setLocation(event.latLng.toJSON());
  };

  const updateSession = () => {
    session.update();
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4 w-full h-[500px] sm:h-[700px]">
      <GoogleMap
        mapContainerClassName="map"
        mapContainerStyle={{ height: "100%", width: "100%" }}
        center={initialCenter}
        zoom={5.4}
        onClick={handleMapClick}
      >
        {markerPosition && (
          <GoogleMapMarker
            position={markerPosition}
            onClick={() => setMarkerPosition(null)}
          />
        )}
      </GoogleMap>
      <form action={action}>
      <FormButton onClick={updateSession}>Enregistrer la position</FormButton> 
        {formState.errors._form ? 
            <div className="p-2 bg-red-900 border border-red-400 rounded">{formState.errors._form?.join(', ')}</div> :
            null}
      </form>
    </div>
  );
};