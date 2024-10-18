import { getAccessToken } from "@/lib/service/auth";
import { SpotifyGetUsersTopArtists } from "@/lib/service/spotify/artist";
import clsx from "clsx";
import Link from "next/link";

export default async function UserArtists() {
  const accessToken = await getAccessToken();
  const artists = await SpotifyGetUsersTopArtists(accessToken);
  if (!artists)
    return (
      <div className="rounded-lg border-[1px] border-primary p-8">Artists not found</div>
    );
  return (
    <div className=" hidden space-y-2 rounded-lg border-[1px] border-primary p-8 md:block">
      <div>
        <h4 className="text-xl font-bold">My Artist</h4>
      </div>
      <div
        className={clsx("", {
          "grid grid-cols-2 gap-2": artists.length > 1,
          "grid grid-cols-1 gap-2": artists.length === 1,
        })}
      >
        {artists.map((artist) => {
          if (!artist.images[1] || !artist.name || !artist.id) return null;
          const href = `/playlist/${encodeURIComponent(artist.name)}`;
          if (artists.length === 1) {
            return (
              <div key={artist.id} className="space-y-2">
                <div className="relative aspect-square w-full overflow-hidden rounded-lg">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={artist.images[1].url}
                    alt={artist.name}
                    className="object-cover object-center"
                  />
                </div>
                <Link
                  href={href}
                  className="line-clamp-1 text-xs font-bold hover:text-muted-foreground"
                >
                  {artist.name}
                </Link>
              </div>
            );
          }
          return (
            <div key={artist.id} className="space-y-2">
              <div className="relative aspect-square w-full overflow-hidden rounded-lg">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={artist.images[1].url}
                  alt={artist.name}
                  className="object-cover object-center"
                />
              </div>
              <Link
                href={href}
                className="line-clamp-1 text-xs font-bold hover:text-muted-foreground"
              >
                {artist.name}
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
