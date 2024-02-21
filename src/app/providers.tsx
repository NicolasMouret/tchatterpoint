'use client';

import { NextUIProvider } from '@nextui-org/react';
import { APIProvider } from '@vis.gl/react-google-maps';
import { SessionProvider } from 'next-auth/react';

interface ProvidersProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (  
      <SessionProvider>
        <NextUIProvider>
          <APIProvider 
            apiKey={process.env.NEXT_PUBLIC_MAPS_API_KEY as string}
            region='FR'>
          {children}
          </APIProvider>
        </NextUIProvider>
      </SessionProvider>
  )
}