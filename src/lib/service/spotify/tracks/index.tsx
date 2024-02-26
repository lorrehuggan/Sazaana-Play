import { Recommendations } from '@/types';

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
  const reponse = await fetch(
    `https://api.spotify.com/v1/recommendations?seed_artists=${searchParams.seed_artists}&limit=12`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  const data = await reponse.json();
  const recommendations = data as Recommendations;
  return recommendations.tracks;
}
