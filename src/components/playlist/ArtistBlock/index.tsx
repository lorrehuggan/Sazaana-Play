import { Button } from '@/components/ui/button';
import { QueryArtists } from '@/types';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  artist: QueryArtists;
  playlistHref: string;
};

export default function ArtistBlock({ artist, playlistHref }: Props) {
  return (
    <div className="relative col-span-2 rounded-lg">
      <div className="relative h-full w-full overflow-hidden rounded-lg">
        {artist.items[0].images[0].url && (
          <Image
            fill
            src={artist.items[0].images[0].url}
            alt="current artist"
            className="object-cover "
            sizes=""
          />
        )}
      </div>
      <div className="absolute left-8 top-8 rounded-md bg-background px-2">
        <h4 className="text-2xl font-bold tracking-tighter">
          {artist.items[0].name}
        </h4>
      </div>
      <Button
        className="absolute bottom-8 right-8 mt-4"
        variant="secondary"
        asChild
      >
        <Link href={playlistHref}>Create Playlist</Link>
      </Button>
    </div>
  );
}
