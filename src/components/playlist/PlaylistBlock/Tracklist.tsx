import { Track } from '@/types';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  playlist: Track[];
};

export default function Tracklist({ playlist }: Props) {
  if (playlist.length === 0) {
    return (
      <div className="col-span-2 p-8 bg-red-400 text-background rounded-lg space-y-2">
        <p className="text-center font-bold">No tracks found.</p>
      </div>
    );
  }
  return (
    <div className="col-span-2 p-8 bg-foreground text-background rounded-lg space-y-2">
      {playlist.map((track) => {
        if (
          !track.album.images[1] ||
          !track.album.name ||
          !track.artists.length ||
          !track.id ||
          !track.name
        )
          return null;
        return (
          <div
            key={track.id}
            className="w-full flex items-center gap-4"
          >
            <div className="w-16 h-16 relative rounded-lg overflow-hidden">
              <Image
                src={track.album.images[1].url}
                alt={track.album.name}
                fill
                sizes="100px"
                className="object-cover object-center"
              />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold line-clamp-1">
                {track.name}
              </p>
              <div className="flex items-center line-clamp-1 gap-1">
                {track.artists.map((artist) => {
                  return (
                    <Link
                      href={`/playlist/${artist.name}`}
                      key={artist.id}
                      className="text-xs line-clamp-1 hover:text-muted-foreground"
                    >
                      {artist.name}
                    </Link>
                  );
                })}
              </div>
            </div>
            <div className="flex-1">
              <p className="line-clamp-1	font-medium text-sm">
                {track.album.name}
              </p>
              <div className="flex items-center line-clamp-1 gap-1">
                <span className="text-xs line-clamp-1">
                  {track.album.total_tracks}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
