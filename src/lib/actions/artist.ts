import { redirect } from 'next/navigation';

export async function searchArtist(formData: FormData) {
  'use server';
  const artist = formData.get('artist');

  return redirect(`/playlist/${artist}`);
}
