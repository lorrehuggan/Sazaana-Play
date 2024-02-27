'use server';

import { submitSearchSchema } from '../service/schema';
import { redirect } from 'next/navigation';
import { z } from 'zod';

export async function searchArtist(formData: FormData) {
  const artist = formData.get('artist');

  return redirect(`/playlist/${artist}`);
}

type FormState = {
  artist: string;
};

export async function submitSearchAction(prev: FormState, data: FormData) {
  console.log({ prev });
  const formData = Object.fromEntries(data);
  const parsed = submitSearchSchema.safeParse(formData);

  if (!parsed.success) {
    return redirect('/playlist');
  }

  return redirect(`/playlist/${formData.artist}`);
}
