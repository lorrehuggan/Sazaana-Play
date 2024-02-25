import { auth, spotify } from '@/lib/auth';
import { headers } from 'next/headers';

type Props = {
  params: {
    artist: string;
  };
  searchParams: {
    artist: string;
  };
};

export default async function Page({ params, searchParams }: Props) {
  // const searchArtist = async function(artist: string) {
  //   const response = await fetch(
  //     `https://api.spotify.com/v1/search?q=${artist}&type=artist&market=US&limit=24`,
  //   );
  // };
  return <>{params.artist}</>;
}
