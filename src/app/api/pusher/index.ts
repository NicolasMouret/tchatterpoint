import { fetchLastMessageWithUsersInfos } from '@/db/queries/chats';
import { NextApiRequest, NextApiResponse } from 'next';
import Pusher from 'pusher';

if (!process.env.NEXT_PUBLIC_PUSHER_APP_ID
  || !process.env.NEXT_PUBLIC_PUSHER_KEY
  || !process.env.PUSHER_SECRET
  || !process.env.NEXT_PUBLIC_PUSHER_CLUSTER) {
  throw new Error('Missing Pusher env variables')
}

export const pusher = new Pusher({
  appId: process.env.NEXT_PUBLIC_PUSHER_APP_ID,
  key: process.env.NEXT_PUBLIC_PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
  useTLS: true,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { chatId } = req.body;

  if (!chatId) {
    return res.status(400).json({ message: 'Missing chatId' });
  }

  const lastMessage = await fetchLastMessageWithUsersInfos(chatId);
  const response = await pusher.trigger(`chat${chatId}`, 'new-message', lastMessage);

  res.status(200).json({ status: "message sent"});
}