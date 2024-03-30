import { Track } from "@/types";
import Image from "next/image";
import Link from "next/link";
import AudioPlayer from "./AudioPlayer";

type Props = {
  playlist: Track[];
};

export default function Tracklist({
  playlist,
}: Props) {
  if (playlist.length === 0) {
    return (
      <div className="col-span-3 space-y-2 rounded-lg border-[1px]  border-primary p-8 md:col-span-2">
        <p className="text-center font-bold">
          No tracks found.
        </p>
      </div>
    );
  }
  return (
    <div className="col-span-3 space-y-2 rounded-lg border-[1px]  border-primary p-8 md:col-span-2">
      <div className="flex items-center justify-between">
        <h4 className="mb-2 text-xl font-bold">
          Playlist
        </h4>
        <h5 className="text-xs text-muted-foreground">
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
            className="flex w-full items-center gap-4"
          >
            <div className="relative h-16 w-16 overflow-hidden rounded-lg">
              <Image
                src={
                  track.album
                    .images[1]
                    .url
                }
                alt={
                  track.album
                    .name
                }
                fill
                sizes="100px"
                className="object-cover object-center"
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-1">
                {track.explicit && (
                  <div className="flex min-h-[16px] min-w-[16px] items-center justify-center rounded bg-lime-500">
                    <span className="text-[10px] font-medium leading-[1] text-white">
                      E
                    </span>
                  </div>
                )}
                <p className="line-clamp-1 text-sm font-bold">
                  {track.name}
                </p>
              </div>
              <div className="line-clamp-1 flex items-center gap-1">
                {track.artists
                  .slice(0, 2)
                  .map(
                    (
                      artist,
                      i,
                    ) => {
                      return (
                        <Link
                          href={`/playlist/${artist.name}`}
                          key={
                            artist.id
                          }
                          className="line-clamp-1 text-xs hover:text-muted-foreground"
                        >
                          {`${artist.name}${i === 0 && track.artists.length > 1 ? "," : ""}`}
                        </Link>
                      );
                    },
                  )}
              </div>
            </div>
            <div className="hidden flex-1 sm:block">
              <p className="line-clamp-1 text-sm font-medium">
                {track.album.name}
              </p>
              <div className="line-clamp-1 flex items-center gap-1">
                <span className="line-clamp-1 text-xs">
                  {
                    track.album.release_date.split(
                      "-",
                    )[0]
                  }
                </span>
              </div>
            </div>
            {track.preview_url && (
              <AudioPlayer
                audioLink={
                  track.preview_url
                }
                title={track.name}
                album={
                  track.album
                    .name
                }
                artist={
                  track
                    .artists[0]
                    .name
                }
                spotifyLink={
                  track
                    .external_urls
                    .spotify
                }
              />
            )}
            {!track.preview_url && (
              <div className="w-14" />
            )}
          </div>
        );
      })}
    </div>
  );
}
