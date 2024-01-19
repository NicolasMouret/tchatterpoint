'use client';

import { useSocket } from "@/components/providers/socket-provider";

export default function SocketIndicator() {
  const { isConnected } = useSocket();

  return (
    <div className="flex items-center gap-2 text-sm">
      <div className={`w-2 h-2 rounded-full ${isConnected ? "bg-green-500" : "bg-red-500"}`}></div>
      <span>{isConnected ? "Connecté" : "Déconnecté"}</span>
    </div>
  )
}