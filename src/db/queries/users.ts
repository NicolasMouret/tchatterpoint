import { db } from '@/db';

export type UserWithLocation = {
  id: string;
  name: string;
  email?: string;
  image: string | null;
  location: {
    lat: number;
    lng: number;
  }
}

export async function fetchAllUsersWithLocation(): Promise<UserWithLocation[]> {
  const query = await db.user.findMany({
    select: {
      id: true,
      name: true,
      image: true,
      latitude: true,
      longitude: true,
    }
  });
  const parsedQuery = query
    .filter(user => user.latitude && user.longitude)
    .map(user => ({
      id: user.id!,
      name: user.name!,
      image: user.image,
      location: {
        lat: user.latitude!,
        lng: user.longitude!,
      }
    }));
  return parsedQuery;
}

export async function fetchUserWithInfos(id: string): Promise<UserWithLocation | null> {
  const query = await db.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      latitude: true,
      longitude: true,
    }
  });
  if (!query || !query.latitude || !query.longitude) {
    return null;
  }
  const parsedQuery = {
    id: query.id!,
    name: query.name!,
    email: query.email!,
    image: query.image,
    location: {
      lat: query.latitude,
      lng: query.longitude,
    }
  };
  return parsedQuery;
}



