import { saveTracksSchema } from '../service/schema';
import { redirect } from 'next/navigation';

type FormState = {
  artist: string;
  ids: string[];
};

export async function saveTracksAction(prev: FormState, data: FormData) {
  const formData = Object.fromEntries(data);
  const parsed = saveTracksSchema.safeParse(formData);

  if (!parsed.success) {
    return redirect('/playlist');
  }

  return redirect(`/playlist/${formData.artist}`);
}
