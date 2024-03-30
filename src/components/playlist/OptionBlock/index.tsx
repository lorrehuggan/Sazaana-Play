import UserArtists from '../UserArtistBlock';
import FilterForm from './FilterForm';
import SaveTrackilstForm from './SaveTracklistForm';
import { getAccessToken } from '@/lib/service/auth';
import type { Track } from '@/types';

export type Props = {
  seed: string;
  playlist: Track[];
};

export default function OptionBlock({ seed, playlist }: Props) {
  return (
    <div className="col-span-3 md:col-span-1 h-fit space-y-4">
      <SaveTrackilstForm playlist={playlist} />
      <UserArtists />
      <FilterForm />
    </div>
  );
}
