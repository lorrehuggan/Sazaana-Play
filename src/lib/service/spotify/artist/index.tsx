import { validateRequest } from "@/lib/auth";
import { Artist, QueryArtists } from "@/types";
import { searchLimiter } from "../../redis/limiters";

export const SpotifySearchArtist = async (artist: string, accessToken: string) => {
  try {
    //TODO: zod validation
    //
    const { session } = await validateRequest();

    if (!session) throw new Error("Session not found");

    const { limit, success, remaining } = await searchLimiter.limit(session.userId);

    if (!success) throw new Error("Rate limit exceeded");

    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${artist}&type=artist&limit=24`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    const data = await response.json();

    const artists = data.artists as QueryArtists;
    //
    return artists;
    await new Promise((resolve) => setTimeout(resolve, 3000));
    // return mockArtist as QueryArtists;
  } catch (e) {
    console.error(e);
  }
};

export const SpotifyGetUsersTopArtists = async (accessToken: string) => {
  try {
    const response = await fetch(
      "https://api.spotify.com/v1/me/top/artists?offset=0&limit=4&time_range=long_term",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    const artists = await response.json();

    return artists.items as Artist[];

    // return mockUserArtists as Artist[];
  } catch (e) {
    console.error(e);
  }
};
