'use client';

import * as actions from '@/actions';
import { Card, Skeleton } from '@nextui-org/react';
import { Map, MapMouseEvent, Marker, useApiIsLoaded } from '@vis.gl/react-google-maps';
import { useSession } from 'next-auth/react';
import { useState } from "react";
import { useFormState } from "react-dom";
import FormButton from '../common/form-button';

export default function MapUserPosition({initialLocation}: 
  {initialLocation: google.maps.LatLngLiteral | null}) {
  const session = useSession(); 
  const center = { lat: 46.7772, lng: 2.2 }; // Center on France whole visible
  const [location, setLocation] = useState<google.maps.LatLngLiteral | null>(initialLocation || null);

  const [updateFormState, updateAction] = useFormState(actions.editUserLocation.bind(null, location), {
    errors: {}
  });
  const [deleteFormState, deleteAction] = useFormState(actions.deleteUserLocation, {
    errors: {}
  });

  const isLoaded = useApiIsLoaded();
  const handleMapClick = (event: MapMouseEvent) => {
    if (!event.detail.latLng) return;
    setLocation(event.detail.latLng);
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
      {isLoaded ? 
        <Map
        style={{ height: "100%", width: "100%" }}
        defaultCenter={center}
        defaultZoom={5.4}
        onClick={handleMapClick}
        streetViewControl={false}
        gestureHandling={"greedy"}
      >
        {location && (
          <Marker
            title={"Votre position"}
            position={location}
            onClick={() => setLocation(null)}
          />
            )}
        </Map> : 
        <Skeleton className="w-full h-[500px] sm:h-[700px]"></Skeleton>}
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
      <form action={deleteAction} onSubmit={() => {session.update({latitude: null, longitude: null}); setLocation(null);}}>
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