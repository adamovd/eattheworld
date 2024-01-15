# Eat the World

Welcome to Eat The World, where we invite you to embark on a global culinary journey right from your kitchen.

## Getting Started

You need a MongoDb database paired with the prisma schema in this project. And you also need to setup Next-Auth, with Credentials Provider, you need to generate a secret for nextAuth, recommend using the following.

```bash
openssl rand -base64 32
```

In your env.local you need to add the followng secrets:

MONGODB_URI
**For uploading images:**
UPLOADTHING_SECRET
UPLOADTHING_APP_ID
NEXTAUTH_SECRET
NEXT_PUBLIC_DOMAIN
NEXT_PUBLIC_SECRET
**For using maps:**
MAPBOX_KEY
MAPBOX_STYLE
ENVIRONMENT_URL

## Commands

You need to add the following line at the top of your scripts in your package.json, to run Prisma Generate on every deploy.

```json
    "postinstall": "prisma generate",
```
