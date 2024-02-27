import FilterForm from './FilterForm';
import SaveTrackilstForm from './SaveTracklistForm';

export type Props = {
  seed: string;
};

export default function FilterBlock({ seed }: Props) {
  return (
    <div className="p-8 space-y-2 col-span-1 bg-secondary rounded-lg h-fit">
      <SaveTrackilstForm />
      <FilterForm />
    </div>
  );
}
