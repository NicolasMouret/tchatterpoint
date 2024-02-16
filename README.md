# Tchatterpoint

## About

Tchatterpoint is a community website centered around the Star Wars Shatterpoint game, primarily designed to help players connect with others nearby.

The platform allows users to pinpoint their location on a map, facilitating the visibility of fellow players' locations. With a messaging feature, 
players can easily communicate with each other. 

Additionally, Tchatterpoint provides a forum-like section where players can engage in discussions on various topics related to the game.

## Built with

- React ([Docs](https://reactjs.org/))
- Next.js  ([Docs](https://nextjs.org/))
- Tailwind CSS ([Docs](https://tailwindcss.com/))
- Prisma ([Docs](https://www.prisma.io/docs/))
- Supabase ([Docs](https://supabase.io/docs/))

### Important Libraries/Tools

- NextUI ([Docs](https://nextui.org/))
- Auth.js ([Docs](https://authjs.dev/getting-started/introduction))
- Resend ([Docs](https://resend.com/docs/introduction))
- React Google Maps API ([Docs](https://www.npmjs.com/package/@react-google-maps/api))
- Cloudinary/Next Cloudinary ([Docs](https://next.cloudinary.dev/))


## Installation

The application is build around the use of several services, you will need to create/setup accounts on the following services :

- [Supabase](https://supabase.io/)
- [Cloudinary](https://cloudinary.com/)
- [Resend](https://resend.com/)
- Google Maps API

Clone the repository and install the dependencies using the following command :

```bash
npm install
```

Create a `.env` file following the `.env.example` file.

You can setup the database using the following command :

```bash
npx prisma migrate dev --name init
```

## Usage

You can start the application using the following commands :

- For development mode:

```bash
npm run dev
```

- For production mode:

```bash
npm run build
```

```bash
npm run start
```

