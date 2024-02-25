import { env } from '@/lib/env/server';
import type { Config } from 'drizzle-kit';

export default {
    schema: './src/lib/db/schema/*',
    out: './src/lib/db/migrations',
    driver: 'libsql',
    dbCredentials: {
        url: env.DATABASE_URL,
    },
} satisfies Config;
