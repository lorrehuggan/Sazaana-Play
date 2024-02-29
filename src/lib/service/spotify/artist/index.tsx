import { mockArtist } from '@/lib/mock';
import { QueryArtists } from '@/types';
import { z } from 'zod';

export const SpotifySearchArtist = async (
  artist: string,
  accessToken: string,
) => {
  try {
    //TODO: zod validation

    // const response = await fetch(
    //   `https://api.spotify.com/v1/search?q=${artist}&type=artist&limit=24`,
    //   {
    //     method: 'GET',
    //     headers: {
    //       Authorization: `Bearer ${accessToken}`,
    //     },
    //   },
    // );
    //
    // const data = await response.json();
    //
    // const artists = data.artists as QueryArtists;
    //
    // return artists;
    return mockArtist as QueryArtists;
  } catch (e) {
    console.error(e);
  }
};
