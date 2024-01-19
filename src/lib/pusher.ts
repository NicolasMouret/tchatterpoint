import PusherServer from 'pusher';
import PusherClient from 'pusher-js';

if (!process.env.PUSHER_APP_ID
  || !process.env.PUSHER_KEY
  || !process.env.PUSHER_SECRET
  || !process.env.PUSHER_CLUSTER) {
  throw new Error('Missing Pusher env variables')
}

export const pusherServer = new PusherServer({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: process.env.PUSHER_CLUSTER,
  useTLS: true,
});

export const pusherClient = new PusherClient(process.env.PUSHER_KEY, {
  cluster: process.env.PUSHER_CLUSTER,
});