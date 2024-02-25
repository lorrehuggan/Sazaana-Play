import { auth, spotify } from '@/lib/auth';
import { db } from '@/lib/db';
import { User, userTable } from '@/lib/db/schema/user';
import { SpotifyUser } from '@/types';
import { OAuth2RequestError } from 'arctic';
import { eq } from 'drizzle-orm';
import { generateId } from 'lucia';
import { cookies } from 'next/headers';

export async function GET(request: Request): Promise<Response> {
    const url = new URL(request.url);

    const code = url.searchParams.get('code');
    const storedState = cookies().get('spotify_oauth_state')?.value ?? null;
    const codeVerifierCookie =
        cookies().get('spotify_auth_code_verifier')?.value ?? null;

    if (!code || !storedState || !codeVerifierCookie) {
        return new Response(null, {
            status: 400,
        });
    }

    try {
        const sessionId = generateId(16);

        const tokens = await spotify.validateAuthorizationCode(code);

        const spotifyUserResponse = await fetch(
            'https://api.spotify.com/v1/me',
            {
                headers: {
                    Authorization: `Bearer ${tokens.accessToken}`,
                },
            },
        );

        const spotifyUser =
            (await spotifyUserResponse.json()) as unknown as SpotifyUser;

        const existingUser = await db
            .select()
            .from(userTable)
            .where(eq(userTable.id, spotifyUser.id))
            .get();

        if (existingUser) {
            const session = await auth.createSession(
                spotifyUser.id,
                {
                    id: sessionId,
                    userId: spotifyUser.id,
                    fresh: tokens.accessTokenExpiresAt < new Date(),
                    expiresAt: new Date(tokens.accessTokenExpiresAt),
                    userEmail: spotifyUser.email ?? '',
                },
                {
                    sessionId: sessionId,
                },
            );

            const sessionCookie = auth.createSessionCookie(session.id);

            cookies().set(
                sessionCookie.name,
                sessionCookie.value,
                sessionCookie.attributes,
            );

            return new Response(null, {
                status: 302,
                headers: {
                    Location: '/playlist',
                },
            });
        }

        const userData = {
            id: spotifyUser.id,
            email: spotifyUser.email,
            name: spotifyUser.display_name,
        };

        await db.insert(userTable).values(userData).execute();

        const session = await auth.createSession(
            spotifyUser.id,
            {
                id: sessionId,
                userId: spotifyUser.id,
                fresh: tokens.accessTokenExpiresAt < new Date(),
                expiresAt: new Date(tokens.accessTokenExpiresAt),
                userEmail: spotifyUser.email ?? '',
            },
            {
                sessionId: sessionId,
            },
        );

        const sessionCookie = auth.createSessionCookie(session.id);

        cookies().set(
            sessionCookie.name,
            sessionCookie.value,
            sessionCookie.attributes,
        );

        return new Response(null, {
            status: 302,
            headers: {
                Location: '/playlist',
            },
        });
    } catch (e) {
        // the specific error message depends on the provider
        if (e instanceof OAuth2RequestError) {
            // invalid code
            console.error(e);
            return new Response(null, {
                status: 400,
            });
        }
        console.error(e);
        return new Response(null, {
            status: 500,
        });
    }
}
