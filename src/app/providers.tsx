'use client';

import { NextUIProvider } from '@nextui-org/react';
import { APIProvider } from '@vis.gl/react-google-maps';
import { SessionProvider } from 'next-auth/react';

interface ProvidersProps {
  children: React.ReactNode;
}

const API_KEY = process.env.NEXT_PUBLIC_MAPS_API_KEY;

export default function Providers({ children }: ProvidersProps) {
  return (  
      <SessionProvider>
        <NextUIProvider>
          <APIProvider 
            apiKey={API_KEY!}
            region='FR'>
          {children}
          </APIProvider>
        </NextUIProvider>
      </SessionProvider>
  )
}