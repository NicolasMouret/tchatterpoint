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

export type UserWithInfos = {
  id: string;
  name: string;
  email?: string;
  image: string | null;
  biography?: string;
  mailIsPublic: boolean;
  location: {
    lat: number;
    lng: number;
  } | null;
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

export async function fetchUserWithInfos(id: string): Promise<UserWithInfos | null> {
  const query = await db.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      biography: true,
      mailIsPublic: true,
      latitude: true,
      longitude: true,
    }
  });
  if (!query) return null;
  if(!query.latitude || !query.longitude) {
    return {
      id: query.id!,
      name: query.name!,
      email: query.email!,
      image: query.image,
      biography: query.biography!,
      mailIsPublic: query.mailIsPublic!,
      location: null,
    };
  };
  const parsedQuery = {
    id: query.id!,
    name: query.name!,
    email: query.email!,
    image: query.image,
    biography: query.biography!,
    mailIsPublic: query.mailIsPublic!,
    location: {
      lat: query.latitude,
      lng: query.longitude,
    },
  };
  return parsedQuery;
}




