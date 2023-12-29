import { db } from '@/db';

export type UserWithLocation = {
  id: string;
  name: string;
  location: {
    latitude: number;
    longitude: number;
  }
}

export async function fetchAllUsersWithLocation(): Promise<UserWithLocation[]> {
  const query = await db.user.findMany({
    select: {
      id: true,
      name: true,
      latitude: true,
      longitude: true,
    }
  });
  const parsedQuery = query
    .filter(user => user.latitude && user.longitude)
    .map(user => ({
      id: user.id!,
      name: user.name!,
      location: {
        latitude: user.latitude!,
        longitude: user.longitude!,
      }
    }));
  return parsedQuery;
}



