import ArtistBlock from '@/components/playlist/ArtistBlock';
import PlaylistBlock from '@/components/playlist/PlaylistBlock';
import ResultBlock from '@/components/playlist/ResultBlock';
import { getAccessToken } from '@/lib/service/auth';
import { SpotifySearchArtist } from '@/lib/service/spotify/artist';
import { SpotifyCreatePlaylist } from '@/lib/service/spotify/tracks';
import { Track } from '@/types';
import Image from 'next/image';

type Props = {
  params: {
    artist: string;
  };
  searchParams: {
    seed_artists: string;
    min_energy: string;
    max_energy: string;
    min_danceability: string;
    max_danceability: string;
    min_valence: string;
    max_valence: string;
    min_tempo: string;
    max_tempo: string;
    min_acousticness: string;
    max_acousticness: string;
  };
};

export default async function Page({ params, searchParams }: Props) {
  const accessToken = await getAccessToken();

  if (!accessToken) return <div>Access token not found</div>;

  const artist = await SpotifySearchArtist(params.artist.trim(), accessToken);

  if (!artist) return <div>Artist not found</div>;

  let playlist = [] as Track[];

  if (searchParams.seed_artists) {
    playlist = await SpotifyCreatePlaylist(searchParams, accessToken);
  }

  const playlistHref = `/playlist/${params.artist}?seed_artists=${artist.items[0].id ?? ''}&min_energy=${searchParams.min_energy ?? ''}&max_energy=${searchParams.max_energy ?? ''}&min_danceability=${searchParams.min_danceability ?? ''}&max_danceability=${searchParams.max_danceability ?? ''}&min_valence=${searchParams.min_valence ?? ''}&max_valence=${searchParams.max_valence ?? ''}&min_tempo=${searchParams.min_tempo ?? ''}&max_tempo=${searchParams.max_tempo ?? ''}&min_acousticness=${searchParams.min_acousticness ?? ''}&max_acousticness=${searchParams.max_acousticness ?? ''}`;

  return (
    <>
      <div className="mx-auto mt-4 w-11/12 max-w-5xl grid grid-cols-5 gap-4 h-[380px]">
        <ResultBlock artist={artist} />
        <ArtistBlock artist={artist} playlistHref={playlistHref} />
      </div>
      {searchParams.seed_artists && (
        <PlaylistBlock
          searchParams={searchParams}
          playlist={playlist}
        />
      )}
    </>
  );
}
