import { createClient } from "@libsql/client";
import { DrizzleSQLiteAdapter } from "@lucia-auth/adapter-drizzle";
import { drizzle } from "drizzle-orm/libsql";
import {
    sessionTable,
    userTable,
} from "./schema/user";

const sqliteClient = createClient({
    url: "libsql://sazaana-lorrehuggan.turso.io",
    authToken:
        "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3MjMyMjEzNTIsImlkIjoiZjkyZjExNjEtZGE5Mi00ZTUxLTllOWYtOWM3OTllMWM4YjI3In0.F0GbJlNv05SmqiWuUdNRQNvz5f5z7ECJmcd38Wc055RkkUTXgsf_5YpTZIOX3m0-NBXZI--SaRTSBGSrKGuMAw",
    // authToken: env.DATABASE_AUTH_TOKEN,
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
