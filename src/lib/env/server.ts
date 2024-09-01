// import { createEnv } from "@t3-oss/env-nextjs";
// import { z } from "zod";
//
// export const env = createEnv({
//     server: {
//         DATABASE_URL: z.string(),
//         REDIRECT_URI: z.string(),
//         SPOTIFY_CLIENT_ID: z.string(),
//         SPOTIFY_CLIENT_SECRET: z.string(),
//         LOCAL_DOMAIN: z.string(),
//         PRODUCTION_DOMAIN: z.string(),
//         DATABASE_AUTH_TOKEN: z.string(),
//         UPSTASH_ENDPOINT: z.string(),
//         UPSTASH_PASSWORD: z.string(),
//     },
//     runtimeEnv: {
//         DATABASE_AUTH_TOKEN:
//             process.env.DATABASE_AUTH_TOKEN,
//         DATABASE_URL: process.env.DATABASE_URL,
//         REDIRECT_URI: process.env.REDIRECT_URI,
//         SPOTIFY_CLIENT_ID:
//             process.env.SPOTIFY_CLIENT_ID,
//         SPOTIFY_CLIENT_SECRET:
//             process.env.SPOTIFY_CLIENT_SECRET,
//         LOCAL_DOMAIN: process.env.LOCAL_DOMAIN,
//         PRODUCTION_DOMAIN:
//             process.env.PRODUCTION_DOMAIN,
//         UPSTASH_ENDPOINT:
//             process.env.UPSTASH_ENDPOINT,
//         UPSTASH_PASSWORD:
//             process.env.UPSTASH_PASSWORD,
//     },
//     // experimental__runtimeEnv: {
//     //     DATABASE_AUTH_TOKEN:
//     //         process.env.DATABASE_AUTH_TOKEN,
//     //     DATABASE_URL: process.env.DATABASE_URL,
//     //     REDIRECT_URI: process.env.REDIRECT_URI,
//     //     SPOTIFY_CLIENT_ID:
//     //         process.env.SPOTIFY_CLIENT_ID,
//     //     SPOTIFY_CLIENT_SECRET:
//     //         process.env.SPOTIFY_CLIENT_SECRET,
//     //     LOCAL_DOMAIN: process.env.LOCAL_DOMAIN,
//     //     PRODUCTION_DOMAIN:
//     //         process.env.PRODUCTION_DOMAIN,
//     //     UPSTASH_ENDPOINT:
//     //         process.env.UPSTASH_ENDPOINT,
//     //     UPSTASH_PASSWORD:
//     //         process.env.UPSTASH_PASSWORD,
//     // },
// });
//
export const BASE_PATH =
  process.env.NODE_ENV === "development"
    ? process.env.LOCAL_DOMAIN ?? ""
    : process.env.PRODUCTION_DOMAIN ?? "";
