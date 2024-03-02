import { Track } from '@/types';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  playlist: Track[];
};

export default function Tracklist({ playlist }: Props) {
  if (playlist.length === 0) {
    return (
      <div className="col-span-2 border-[1px] border-primary  p-8 rounded-lg space-y-2">
        <p className="text-center font-bold">No tracks found.</p>
      </div>
    );
  }
  return (
    <div className="col-span-2 border-[1px] border-primary  p-8 rounded-lg space-y-2">
      <div className="flex items-center justify-between">
        <h4 className="font-bold text-xl mb-2">Playlist</h4>
        <h5 className="text-muted-foreground text-xs">
          {playlist.length} tracks
        </h5>
      </div>
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
              <div className="flex items-center gap-1">
                {track.explicit && (
                  <div className="flex justify-center items-center rounded bg-lime-500 h-[16px] w-[16px]">
                    <span className="leading-[1] font-medium text-white text-[10px]">
                      E
                    </span>
                  </div>
                )}
                <p className="text-sm font-bold line-clamp-1">
                  {track.name}
                </p>
              </div>
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
                  {track.album.release_date.split('-')[0]}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
