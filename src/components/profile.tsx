'use client';
import { useSession } from 'next-auth/react';

export default function Profile() {
  const { data: session } = useSession();

  if (session?.user) {
    return (
      <div>
        <h2>From client user is signed in</h2>
        <div>{JSON.stringify(session.user)}</div>
      </div>
    )
  }

  return (
    <div>
      <h2>From client user is signed out</h2>
    </div>
  )

}