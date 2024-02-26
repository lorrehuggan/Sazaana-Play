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
    <div className="col-span-2 rounded-lg bg-foreground relative">
      <div className="h-full w-full relative rounded-lg overflow-hidden">
        {artist.items[0].images[0].url && (
          <Image
            objectFit="cover"
            fill
            src={artist.items[0].images[0].url}
            alt="current artist"
            className="object-cover grayscale"
          />
        )}
      </div>
      <div className="absolute top-8 left-8 bg-background rounded-md px-2">
        <h4 className="font-bold tracking-tighter text-2xl">
          {artist.items[0].name}
        </h4>
      </div>
      <Button
        className="mt-4 absolute bottom-8 right-8"
        variant="secondary"
        asChild
      >
        <Link href={playlistHref}>Create Playlist</Link>
      </Button>
    </div>
  );
}
