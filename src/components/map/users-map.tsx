'use client';

import { UserWithLocation } from '@/db/queries/users';
import { Skeleton } from '@nextui-org/react';
import {
  GoogleMap,
  Marker as GoogleMapMarker,
  useLoadScript,
} from "@react-google-maps/api";
import { useState } from "react";

const API_KEY = process.env.NEXT_PUBLIC_MAPS_API_KEY;

export default function MapUsersShow({usersLocationList}: {usersLocationList: UserWithLocation[]}) {
  const [initialCenter, setInitialCenter] = useState(
    { lat: 46.7772, lng: 2.2 }); // Center on France whole visible
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: API_KEY as string,
  });
  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <Skeleton className="w-full h-[500px] sm:h-[700px]"></Skeleton>;

  //Create a list of markers from the usersLocationList
  const MarkerList = usersLocationList.map((user) => {
    return (
      <GoogleMapMarker
        key={user.id}
        position={user.location}
      />
    );
  
  })


  return (
    <div className="flex flex-col items-center justify-center gap-4 w-full h-[500px] sm:h-[700px]">
      <GoogleMap
        mapContainerClassName="map"
        mapContainerStyle={{ height: "100%", width: "100%" }}
        center={initialCenter}
        zoom={5.4}
      >
        {MarkerList}  
      </GoogleMap>
    </div>
  );
};