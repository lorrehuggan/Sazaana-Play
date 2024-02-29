import FilterForm from './FilterForm';
import SaveTrackilstForm from './SaveTracklistForm';
import type { Track } from '@/types';

export type Props = {
  seed: string;
  playlist: Track[];
};

export default function FilterBlock({ seed, playlist }: Props) {
  return (
    <div className="space-y-4 col-span-1 h-fit">
      <SaveTrackilstForm playlist={playlist} />
      <FilterForm />
    </div>
  );
}
