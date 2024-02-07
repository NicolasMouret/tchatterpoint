'use client';

import * as actions from '@/actions';
import { Card, Skeleton } from '@nextui-org/react';
import {
  GoogleMap,
  Marker as GoogleMapMarker,
  useLoadScript,
} from "@react-google-maps/api";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from "react";
import { useFormState } from "react-dom";
import FormButton from '../common/form-button';

const API_KEY = process.env.NEXT_PUBLIC_MAPS_API_KEY;

export default function MapUserPosition({initialLocation}: 
  {initialLocation: google.maps.LatLngLiteral | null}) {
  const router = useRouter();
  const session = useSession();
  const [initialCenter, setInitialCenter] = useState(
    { lat: 46.7772, lng: 2.2 }); // Center on France whole visible
  const [location, setLocation] = useState<google.maps.LatLngLiteral | null>(initialLocation || null);
  const [markerPosition, setMarkerPosition] = useState<google.maps.LatLngLiteral | null>
  (initialLocation || null);

  const [updateFormState, updateAction] = useFormState(actions.editUserLocation.bind(null, location), {
    errors: {}
  });
  const [deleteFormState, deleteAction] = useFormState(actions.deleteUserLocation, {
    errors: {}
  });

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: API_KEY as string,
  });
  if (loadError) return <div>Erreur au chargement de la carte</div>;
  if (!isLoaded) return <Skeleton className="w-full h-[500px] sm:h-[700px]"></Skeleton>

  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    if (!event.latLng) return;
    setMarkerPosition(event.latLng.toJSON());
    setLocation(event.latLng.toJSON());
  };

  return (
    <Card 
    className="flex flex-col items-center justify-center gap-3 w-full h-[700px] sm:h-[850px]
    px-3 py-5 sm:p-6 border-1 border-slate-500"
    isBlurred>
      <p>
        Pour être visible sur la carte des joueurs, 
        placez un marqueur sur la carte et enregistrez la position.
      </p>
      <p>
        Vous pouvez à tout moment déplacer le marqueur et enregistrer une 
        nouvelle position ou la retirer de la carte.
      </p>
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
      <form className="mt-2" action={updateAction} 
      onSubmit={() => session.update({latitude: location?.lat, longitude: location?.lng})}>
        <FormButton 
        className="font-medium text-base"
        size="lg"
        color="primary"
        variant="shadow"
        >
        Enregistrer la position
        </FormButton> 
        {updateFormState.errors._form ? 
          <div className="p-2 bg-red-900 border border-red-400 rounded">
            {updateFormState.errors._form?.join(', ')}
          </div> 
          : null}
      </form>
      <form action={deleteAction} onSubmit={() => {session.update({latitude: null, longitude: null}); setMarkerPosition(null);}}>
        <FormButton 
          className="font-medium text-base"
          color="warning"
          variant="ghost"
          size="lg"
          >
          Retirer ma position
        </FormButton> 
        {deleteFormState.errors._form ? 
            <div className="p-2 bg-red-900 border border-red-400 rounded">{deleteFormState.errors._form?.join(', ')}</div> :
            null}
      </form>
    </Card>
  );
};