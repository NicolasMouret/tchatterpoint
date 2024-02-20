'use client';


import { UserWithLocation } from '@/db/queries/users';
import paths from '@/paths';
import { Card, Image, Link, Skeleton } from '@nextui-org/react';
import { InfoWindow, Map, Marker, useApiIsLoaded } from '@vis.gl/react-google-maps';
import { useState } from "react";

const API_KEY = process.env.NEXT_PUBLIC_MAPS_API_KEY;

export default function MapUsersShow({usersLocationList}: {usersLocationList: UserWithLocation[]}) {
  const center = { lat: 46.7772, lng: 2.2 }; // Center on France whole visible
  const [selectedUser, setSelectedUser] = useState<UserWithLocation | null >(null);
  const isLoaded = useApiIsLoaded();
  

  //CREATE MARKERS LIST FROM ALL USERS WITH LOCATION
  const MarkerList = usersLocationList.map((user) => {
    return (
      <Marker
        key={user.id}
        title={user.name}
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
      data-testid="map"
      >
      {isLoaded ?
      <Map
        style={{ height: "100%", width: "100%" }}
        defaultCenter={center}
        defaultZoom={5.4}
        streetViewControl={false}
        gestureHandling={"greedy"}
      >
      <>
        {MarkerList} 
        {selectedUser && (
          <InfoWindow
            onCloseClick={() => {
            setSelectedUser(null);
          }}     
            position={selectedUser.location}>
              <div className="w-fit h-fit text-black flex items-center gap-4">
                <Link href={paths.publicProfile(selectedUser.id)}>
                  <Image 
                    alt="user profile picture" 
                    src={selectedUser.image || ""}
                    width={40}
                    height={40}
                    style={{
                      width: "45px",
                      height: "45px",
                      objectFit: "cover",}}/>
                </Link>
                <Link 
                  href={paths.publicProfile(selectedUser.id)} 
                  className="font-extrabold text-lg hover:underline font-stdFont">
                    {selectedUser.name}
                </Link>
              </div>   
          </InfoWindow>
        )} 
      </>
      </Map> :
      <Skeleton className="w-full h-[500px] sm:h-[700px]"></Skeleton>}
    </Card>
  );
};