import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import { Track } from '@/types';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  searchParams: {
    seed_artists: string;
    min_energy: string;
    max_energy: string;
    min_danceability: string;
    max_danceability: string;
    min_valence: string;
    max_valence: string;
    min_tempo: string;
    max_tempo: string;
    min_acousticness: string;
    max_acousticness: string;
  };
  playlist: Track[];
};

export default function PlaylistBlock({ searchParams, playlist }: Props) {
  return (
    <div className="mx-auto mt-4 w-11/12 max-w-5xl grid grid-cols-3 gap-4 min-h-[580px]">
      <div className="p-8 space-y-2 col-span-1 bg-secondary rounded-lg h-fit">
        <form className="space-y-2">
          <Input
            name="title"
            placeholder="Playlist Name"
            className="bg-background"
          />
          <Button className="w-full" asChild>
            <Link
              href="/login/spotify"
              className="flex gap-2 items-center"
            >
              <svg
                className="fill-white"
                width="24"
                height="24"
                xmlns="http://www.w3.org/2000/svg"
                fill-rule="evenodd"
                clip-rule="evenodd"
              >
                <path d="M19.098 10.638c-3.868-2.297-10.248-2.508-13.941-1.387-.593.18-1.22-.155-1.399-.748-.18-.593.154-1.22.748-1.4 4.239-1.287 11.285-1.038 15.738 1.605.533.317.708 1.005.392 1.538-.316.533-1.005.709-1.538.392zm-.126 3.403c-.272.44-.847.578-1.287.308-3.225-1.982-8.142-2.557-11.958-1.399-.494.15-1.017-.129-1.167-.623-.149-.495.13-1.016.624-1.167 4.358-1.322 9.776-.682 13.48 1.595.44.27.578.847.308 1.286zm-1.469 3.267c-.215.354-.676.465-1.028.249-2.818-1.722-6.365-2.111-10.542-1.157-.402.092-.803-.16-.895-.562-.092-.403.159-.804.562-.896 4.571-1.045 8.492-.595 11.655 1.338.353.215.464.676.248 1.028zm-5.503-17.308c-6.627 0-12 5.373-12 12 0 6.628 5.373 12 12 12 6.628 0 12-5.372 12-12 0-6.627-5.372-12-12-12z" />
              </svg>
              <span>Save to Spotify</span>
            </Link>
          </Button>
        </form>
        <p className="mb-2 font-bold">Filter</p>
        <form className="space-y-4">
          <fieldset className="">
            <label className="uppercase text-xs">Energy</label>
            <Slider
              name="energy"
              defaultValue={[50]}
              max={100}
              step={1}
            />
          </fieldset>
          <Separator className="bg-foreground" />
          <fieldset className="">
            <label className="uppercase text-xs">Temp</label>
            <Slider
              name="energy"
              defaultValue={[50]}
              max={100}
              step={1}
            />
          </fieldset>
          <Separator className="bg-foreground" />
          <fieldset className="">
            <label className="uppercase text-xs">Temp</label>
            <Slider
              name="energy"
              defaultValue={[50]}
              max={100}
              step={1}
            />
          </fieldset>
          <Separator className="bg-foreground" />
          <fieldset className="">
            <label className="uppercase text-xs">Temp</label>
            <Slider
              name="energy"
              defaultValue={[50]}
              max={100}
              step={1}
            />
          </fieldset>
          <Separator className="bg-foreground" />
        </form>
      </div>
      <div className=" col-span-2 p-8 bg-foreground text-background rounded-lg space-y-2">
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
              <p className="flex-1 line-clamp-1	font-medium text-sm">
                {track.album.name}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
