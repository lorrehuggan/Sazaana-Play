import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
    server: {
        DATABASE_URL: z.string().url(),
        REDIRECT_URI: z.string().url(),
        SPOTIFY_CLIENT_ID: z.string(),
        SPOTIFY_CLIENT_SECRET: z.string(),
    },
    experimental__runtimeEnv: {
        DATABASE_AUTH_TOKEN: process.env.DATABASE_AUTH_TOKEN,
        DATABASE_URL: process.env.DATABASE_URL,
        REDIRECT_URI: process.env.REDIRECT_URI,
        SPOTIFY_CLIENT_ID: process.env.SPOTIFY_CLIENT_ID,
        SPOTIFY_CLIENT_SECRET: process.env.SPOTIFY_CLIENT_SECRET,
    },
});
