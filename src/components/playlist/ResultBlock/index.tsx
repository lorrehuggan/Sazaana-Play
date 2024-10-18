import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { QueryArtists } from "@/types";
import Link from "next/link";

type Props = {
  artist: QueryArtists;
};

export default function ResultBlock({ artist }: Props) {
  return (
    <div className="col-span-5 overflow-hidden rounded-lg border-[1px] border-primary p-8 md:col-span-3">
      <h3 className="text-2xl font-bold tracking-tighter">Related Results:</h3>
      <ScrollArea className="h-[90%] w-full md:h-[280px] ">
        {artist.items.slice(1, artist.items.length).map((item) => {
          if (!item.images[2] || !item.name || !item.id || !item.genres.length)
            return null;
          return (
            <Link key={item.id} href={`/playlist/${item.name}`}>
              <div className="flex items-center gap-4 py-2">
                <div className="relative h-[50px] w-[50px] overflow-hidden rounded-sm">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="object-cover grayscale"
                    src={item.images[2].url}
                    alt={item.name}
                  />
                </div>
                <div>
                  <p className="font-bold">{item.name}</p>
                  <div className="flex items-center gap-1 text-xs capitalize text-muted-foreground">
                    {item.genres.slice(0, 2).map((genre) => {
                      return <span key={genre}>{genre}</span>;
                    })}
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
        <ScrollBar orientation="vertical" />
      </ScrollArea>
    </div>
  );
}
