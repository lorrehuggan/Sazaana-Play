import { Button } from "@/components/ui/button";
import { DirectionAwareHover } from "@/components/ui/direction-aware-hover";
import { QueryArtists } from "@/types";
import Link from "next/link";

type Props = {
  artist: QueryArtists;
  playlistHref: string;
};

export default function ArtistBlock({ artist, playlistHref }: Props) {
  return (
    <div className="relative col-span-5 rounded-lg md:col-span-2">
      <div className="relative h-full w-full overflow-hidden rounded-lg">
        {artist.items[0].images[0].url && (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={artist.items[0].images[0].url}
              alt="current artist"
              className="object-cover grayscale md:hidden"
            />
            <DirectionAwareHover
              className="relative hidden grayscale md:block"
              imageUrl={artist.items[0].images[0].url}
            >
              <h4 className="mb-2 text-2xl font-bold">{artist.items[0].name}</h4>
              <Button className="" variant="secondary" asChild>
                <Link href={playlistHref}>Create Playlist</Link>
              </Button>
            </DirectionAwareHover>
          </>
        )}
      </div>
      <div className="absolute left-8 top-8 rounded-sm bg-background px-2 md:hidden">
        <h4 className="text-2xl font-bold tracking-tighter">{artist.items[0].name}</h4>
      </div>
      <Button
        className="absolute bottom-8 right-8 mt-4 md:hidden"
        variant="secondary"
        asChild
      >
        <Link href={playlistHref}>Create Playlist</Link>
      </Button>
    </div>
  );
}
