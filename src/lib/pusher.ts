import PusherServer from 'pusher';
import PusherClient from 'pusher-js';

const PUSHER_APP_ID = process.env.PUSHER_APP_ID
const PUSHER_KEY = process.env.PUSHER_KEY
const PUSHER_SECRET = process.env.PUSHER_SECRET
const PUSHER_CLUSTER = process.env.PUSHER_CLUSTER

if (!PUSHER_APP_ID
  || !PUSHER_KEY
  || !PUSHER_SECRET
  || !PUSHER_CLUSTER) {
  throw new Error('Missing Pusher env variables')
}

export const pusherServer = new PusherServer({
  appId: PUSHER_APP_ID,
  key: PUSHER_KEY,
  secret: PUSHER_SECRET,
  cluster: PUSHER_CLUSTER,
  useTLS: true,
});

export const pusherClient = new PusherClient(PUSHER_KEY, {
  cluster: PUSHER_CLUSTER,
});