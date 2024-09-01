"use client";

import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function FilterForm() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const seed_artist = searchParams.get("seed_artists");

  const initialState: Record<string, string | null> = {
    seed_artist: searchParams.get("seed_artists"),
    min_energy: searchParams.get("min_energy"),
    max_energy: searchParams.get("max_energy"),
    min_danceability: searchParams.get("min_danceability"),
    max_danceability: searchParams.get("max_danceability"),
    min_valence: searchParams.get("min_valence"),
    max_valence: searchParams.get("max_valence"),
    min_tempo: searchParams.get("min_tempo"),
    max_tempo: searchParams.get("max_tempo"),
    min_acousticness: searchParams.get("min_acousticness"),
    max_acousticness: searchParams.get("max_acousticness"),
  };

  const data = [
    {
      name: "energy",
      min: 0,
      max: 1,
      step: 0.1,
      minSteps: 0.1,
      value: {
        min: "min_energy",
        max: "max_energy",
      },
      attributes: {
        low: "Chill Vibes Only",
        high: "Electrify the Night",
      },
    },
    {
      name: "danceability",
      min: 0,
      max: 1,
      step: 0.1,
      minSteps: 0.1,
      value: {
        min: "min_danceability",
        max: "max_danceability",
      },
      attributes: {
        low: "Two Left Fee",
        high: "Dancing Queen",
      },
    },
    {
      name: "valence (mood)",
      min: 0,
      max: 1,
      step: 0.1,
      minSteps: 0.1,
      value: {
        min: "min_valence",
        max: "max_valence",
      },
      attributes: {
        low: "Rainy Day Blues",
        high: "Sunshine and Rainbows",
      },
    },
    {
      name: "tempo",
      min: 50,
      max: 200,
      step: 5,
      minSteps: 5,
      value: {
        min: "min_tempo",
        max: "max_tempo",
      },
      attributes: {
        low: "Slow-Mo Mode",
        high: "Speed Demon Beats",
      },
    },
    {
      name: "acousticness",
      min: 0,
      max: 1,
      step: 0.1,
      minSteps: 0.1,
      value: {
        min: "min_acousticness",
        max: "max_acousticness",
      },
      attributes: {
        low: "Synthetic Symphony",
        high: "Unplugged",
      },
    },
  ];

  const BASE_PATH = "http://localhost:3000";

  const url = new URL(`${BASE_PATH}${pathname}`);

  function filterAction(params: Record<string, number>) {
    url.searchParams.set("seed_artists", seed_artist ?? "");
    for (const [key, value] of Object.entries(initialState)) {
      if (value === null) {
        url.searchParams.set(key, "");
        continue;
      }
      url.searchParams.set(key, value);
    }

    for (const [key, value] of Object.entries(params)) {
      url.searchParams.set(key, value.toString());
    }

    router.push(url.toString(), {
      scroll: false,
    });
  }

  return (
    <div className="hidden rounded-lg border-[1px] border-primary p-8 md:block">
      <h4 className="mb-2 text-xl font-bold">Filter Tracks</h4>
      <form className="space-y-2">
        {data.map((item) => (
          <>
            <fieldset key={item.value.min}>
              <label className="text-xs uppercase">{item.name}</label>
              <Slider
                className="mt-2"
                minStepsBetweenThumbs={item.minSteps}
                onValueCommit={(value) =>
                  filterAction({
                    [item.value.min]: value[0],
                    [item.value.max]: value[1],
                  })
                }
                min={item.min}
                name={item.name}
                defaultValue={[item.min, item.max]}
                max={item.max}
                step={item.step}
              />
            </fieldset>
            <div className="mt-1 flex items-center justify-between gap-4 text-xs text-muted-foreground">
              <p>{item.attributes.low}</p>
              <p>{item.attributes.high}</p>
            </div>
            <Separator className="bg-foreground" />
          </>
        ))}
      </form>
    </div>
  );
}
