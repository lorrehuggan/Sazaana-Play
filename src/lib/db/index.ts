import { env } from '@lib/env/server';
import { createClient } from '@libsql/client';
import { DrizzleSQLiteAdapter } from '@lucia-auth/adapter-drizzle';
import { drizzle } from 'drizzle-orm/libsql';

import { sessionTable, userTable } from './schema/user';

const sqliteClient = createClient({
    url: env.DATABASE_URL,
});

export const db = drizzle(sqliteClient);

export const dbAdapter = new DrizzleSQLiteAdapter(db, sessionTable, userTable);
