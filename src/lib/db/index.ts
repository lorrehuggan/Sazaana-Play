import { createClient } from "@libsql/client";
import { DrizzleSQLiteAdapter } from "@lucia-auth/adapter-drizzle";
import { drizzle } from "drizzle-orm/libsql";
import {
    sessionTable,
    userTable,
} from "./schema/user";

const sqliteClient = createClient({
    url: process.env.DATABASE_URL ?? "",
    authToken:
        process.env.DATABASE_AUTH_TOKEN ?? "",
});

export const db = drizzle(sqliteClient, {
    schema: {
        user: userTable,
        session: sessionTable,
    },
});

export const dbAdapter = new DrizzleSQLiteAdapter(
    db,
    sessionTable,
    userTable,
);
