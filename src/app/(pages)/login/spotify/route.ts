import {
    codeVerifier,
    spotify,
    state,
} from "@/lib/auth";
import { cookies } from "next/headers";

export async function GET(): Promise<Response> {
    const url =
        await spotify.createAuthorizationURL(
            state,
            {
                scopes: [
                    // Users
                    "user-read-email",
                    "user-read-private",
                    // Playlists
                    "playlist-read-private",
                    "playlist-read-collaborative",
                    "playlist-modify-public",
                    "playlist-modify-private",
                    // Listening History
                    "user-read-recently-played",
                    "user-top-read",
                    // Library
                    "user-library-read",
                    "user-library-modify",
                    // Follow
                    "user-follow-read",
                    "user-follow-modify",
                ],
            },
        );

    cookies().set("spotify_oauth_state", state, {
        path: "/",
        secure:
            process.env.NODE_ENV === "production",
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 7,
        sameSite: "lax",
    });
    cookies().set(
        "spotify_auth_code_verifier",
        codeVerifier,
        {
            path: "/",
            secure:
                process.env.NODE_ENV ===
                "production",
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 7,
            sameSite: "lax",
        },
    );

    return Response.redirect(url);
}
