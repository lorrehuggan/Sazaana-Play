import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { QueryArtists } from '@/types';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  artist: QueryArtists;
};

export default function ResultBlock({ artist }: Props) {
  return (
    <div className="col-span-3 rounded-lg border-[1px] border-primary p-8 overflow-hidden">
      <h3 className="text-2xl font-bold tracking-tighter">
        Related Results:
      </h3>
      <ScrollArea className="h-[280px] w-full ">
        {artist.items.slice(1, artist.items.length).map((item) => {
          if (
            !item.images[2] ||
            !item.name ||
            !item.id ||
            !item.genres.length
          )
            return null;
          return (
            <Link key={item.id} href={`/playlist/${item.name}`}>
              <div className="py-2 flex items-center gap-4">
                <div className="relative overflow-hidden rounded-sm w-[50px] h-[50px]">
                  <Image
                    className="object-cover"
                    src={item.images[2].url}
                    alt={item.name}
                    fill
                  />
                </div>
                <div>
                  <p className="font-bold">{item.name}</p>
                  <div className="flex capitalize items-center text-xs text-muted-foreground gap-1">
                    {item.genres
                      .slice(0, 3)
                      .map((genre) => {
                        return (
                          <span key={genre}>
                            {genre}
                          </span>
                        );
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
