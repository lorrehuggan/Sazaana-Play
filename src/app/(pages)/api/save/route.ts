import { validateRequest } from "@/lib/auth";
import { db } from "@/lib/db";
import { sessionTable } from "@/lib/db/schema/user";
import { eq } from "drizzle-orm";
import { z } from "zod";

export async function POST(request: Request) {
    const { session } = await validateRequest();

    if (!session) {
        return Response.json({
            error: "User not authorised",
        });
    }

    const schema = z.object({
        title: z.string().min(1),
        ids: z.string().array(),
        public: z.boolean(),
    });

    const data = await request.json();

    const user_id = session.userId;

    try {
        const accessToken = await db
            .select({
                token: sessionTable.accessToken,
            })
            .from(sessionTable)
            .where(
                eq(sessionTable.userId, user_id),
            );

        const url = new URL(
            `https://api.spotify.com/v1/users/${user_id}/playlists`,
        );

        const parsed = schema.parse(data);

        const createPlaylist = await fetch(url, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken[0].token}`,
                "Content-Type":
                    "application/json",
            },
            body: JSON.stringify({
                name: parsed.title,
                description:
                    "Created with Sazaana.com",
                public: parsed.public,
            }),
        });

        const playlist =
            await createPlaylist.json();

        const playlistId = playlist.id;

        const addTracks = await fetch(
            `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${accessToken[0].token}`,
                    "Content-Type":
                        "application/json",
                },
                body: JSON.stringify({
                    uris: parsed.ids,
                }),
            },
        );

        const addedTracks =
            await addTracks.json();

        return Response.json({
            status: "ok",
            link: playlist.external_urls.spotify,
        });
    } catch (e) {
        console.log(e);
        if (e instanceof z.ZodError) {
            return Response.json({
                error: e.errors,
            });
        }
        if (e instanceof TypeError) {
            return Response.json({
                error: "User not authorised",
            });
        }
        if (e instanceof Error) {
            return Response.json({
                error: e.message,
            });
        }
        return Response.json({
            error: "An error occurred",
        });
    }
}
