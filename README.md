# pixboard.io

Pixboard is an application that uses Cloudinary's capabilities to enhance your images in different ways. Thanks to realtime features, you'll be able to collaborate with others users.

# Stack

- **Client Framework**: [Next.js](https://nextjs.org/)
- **Design capabilities and API for images**: [Cloudinary](https://cloudinary.com/)
- **Realtime**: [Liveblocks.io](https://liveblocks.io/)
- **Authentication**: [NextAuth](https://next-auth.js.org/)
- **Deployment**: [Netlify](https://www.netlify.com/)

# Setting credentials

## Cloudinary - API Keys

1. Sign up on Cloudinary.
2. Go to [console option](https://console.cloudinary.com/console).
3. Then, go to Dashboard and you'll be able to find your `Cloud Name`, `API Key`, and `API Secret`
4. Copy and paste them into `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` and `CLOUDINARY_NAME`.
5. After that, go to Media Library in the sidebar and press *Folders*.
6. Press on *Create a Folder*, then fill up `CLOUDINARY_FOLDER_IMAGES` with your folder's name. Here is where your images are going to store.

## Github - Client ID and Client Secret

1. Go to [Create new Github OAuth app](https://github.com/settings/applications/new).
2. Then go to *Client secrets* and generate a new one. Then, paste it into `GITHUB_CLIENT_SECRET`.
3. Finally, copy the Client ID and paste it into `GITHUB_CLIENT_ID`.

## NextAuth - Secrets

You can find ways to generate your API [here](https://next-auth.js.org/configuration/options#nextauth_secret).
Once you get it, paste it into `NEXTAUTH_SECRET`.

## Liveblocks - Secret

1. Go to [Liveblocks](https://liveblocks.io/dashboard/).
2. Create a project, then go to *API Keys* in the sidebar and copy your secret key.
3. Finally, paste it into `LIVEBLOCKS_SECRET`.

# Run locally

1. Clone this repo to a directory and then run `npm install`.
2. Set-up your environment variables.
3. Run `npm run dev` to start developing mode.
