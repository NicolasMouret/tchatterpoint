'use client';

import { SocketProvider } from '@/components/providers/socket-provider';
import { NextUIProvider } from '@nextui-org/react';
import { SessionProvider } from 'next-auth/react';

interface ProvidersProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <SocketProvider>  
      <SessionProvider>
        <NextUIProvider>
          {children}
        </NextUIProvider>
      </SessionProvider>
    </SocketProvider>
  )
}