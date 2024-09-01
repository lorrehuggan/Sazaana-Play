import { validateRequest } from "@/lib/auth";
import { Recommendations } from "@/types";
import { filterLimiter } from "../../redis/limiters";

type SearchParams = {
    seed_artists: string;
    min_energy: string | undefined;
    max_energy: string | undefined;
    min_danceability: string | undefined;
    max_danceability: string | undefined;
    min_valence: string | undefined;
    max_valence: string | undefined;
    min_tempo: string | undefined;
    max_tempo: string | undefined;
    min_acousticness: string | undefined;
    max_acousticness: string | undefined;
};

export async function SpotifyCreatePlaylist(
    searchParams: SearchParams,
    accessToken: string,
) {
    const { session } = await validateRequest();

    if (!session) throw new Error("Session not found");

    const { success } = await filterLimiter.limit(session.userId);

    if (!success) throw new Error("Rate limit exceeded");

    const { seed_artists, ...otherParams } = searchParams;

    const url = new URL(
        `https://api.spotify.com/v1/recommendations?seed_artists=${seed_artists}&limit=15`,
    );

    for (const key in otherParams) {
        const value = otherParams[key as keyof typeof otherParams];
        if (value !== undefined) {
            url.searchParams.set(key, value);
        }
    }

    const reponse = await fetch(url, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    const data = await reponse.json();
    const recommendations = data as Recommendations;
    return recommendations.tracks;
    // return mockdata as Track[];
}
