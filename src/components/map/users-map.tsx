'use client';


import { UserWithLocation } from '@/db/queries/users';
import paths from '@/paths';
import { Card, Image, Link, Skeleton } from '@nextui-org/react';
import {
  GoogleMap,
  Marker as GoogleMapMarker,
  InfoWindow,
  useLoadScript
} from "@react-google-maps/api";
import { useState } from "react";

const API_KEY = process.env.NEXT_PUBLIC_MAPS_API_KEY;

export default function MapUsersShow({usersLocationList}: {usersLocationList: UserWithLocation[]}) {
  const [initialCenter, setInitialCenter] = useState(
    { lat: 46.7772, lng: 2.2 }); // Center on France whole visible
  const [selectedUser, setSelectedUser] = useState<UserWithLocation | null >(null);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: API_KEY as string,
  });
  if (loadError) return <div>Erreur au chargement de la carte</div>;
  if (!isLoaded) return <Skeleton className="w-full h-[500px] sm:h-[700px]"></Skeleton>;

  //Create a list of markers from the usersLocationList
  const MarkerList = usersLocationList.map((user) => {
    return (
      <GoogleMapMarker
        key={user.id}
        position={user.location}
        onClick={() => {
          setSelectedUser(user);
        }}
      />
    );
  
  })


  return (
    <Card 
      className="flex flex-col items-center justify-center gap-4 p-3 sm:p-6
      w-full h-[500px] sm:h-[700px] border-1 border-slate-500"
      isBlurred
      radius="sm"
      >
      <GoogleMap
        mapContainerClassName="map"
        mapContainerStyle={{ height: "100%", width: "100%" }}
        center={initialCenter}
        zoom={5.4}
      >
      <>
        {MarkerList} 
        {selectedUser && (
          <InfoWindow
            onCloseClick={() => {
            setSelectedUser(null);
          }}     
            position={selectedUser.location}>
              <div className="w-fit h-fit text-black flex items-center gap-2">
                <Image 
                  alt="user profile picture" 
                  src={selectedUser.image || ""}
                  width={40}
                  height={40}/>
                <Link 
                  href={paths.publicProfile(selectedUser.id)} 
                  className="font-bold text-lg">
                    {selectedUser.name}
                </Link>
              </div>   
          </InfoWindow>
        )} 
      </>
      </GoogleMap>
    </Card>
  );
};