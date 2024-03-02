import FilterBlock from '../FilterBlock';
import PlaylistBlock from '../PlaylistBlock';
import { getAccessToken } from '@/lib/service/auth';
import { SpotifyCreatePlaylist } from '@/lib/service/spotify/tracks';
import { SearchParams } from '@/types';

type Props = {
  searchParams: SearchParams;
};

export default async function RowTwo({ searchParams }: Props) {
  const accessToken = await getAccessToken();
  const playlist = await SpotifyCreatePlaylist(searchParams, accessToken);

  return (
    <div className="mx-auto mt-4 w-11/12 max-w-5xl grid grid-cols-3 gap-4 min-h-[580px] mb-16">
      <PlaylistBlock playlist={playlist} />
      <FilterBlock playlist={playlist} seed={searchParams.seed_artists} />
    </div>
  );
}
