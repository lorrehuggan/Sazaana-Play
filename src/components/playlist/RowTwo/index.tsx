import OptionBlock from '../OptionBlock';
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
    <div className="mx-auto mb-16 mt-4 grid min-h-[580px] w-11/12 max-w-5xl grid-cols-3 gap-4">
      <PlaylistBlock playlist={playlist} />
      <OptionBlock playlist={playlist} seed={searchParams.seed_artists} />
    </div>
  );
}
