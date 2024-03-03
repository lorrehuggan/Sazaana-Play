"use client";

import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function FilterForm() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();

    const seed_artist = searchParams.get("seed_artists");
    const min_energy = Number(searchParams.get("min_energy"));
    const max_energy = Number(searchParams.get("max_energy"));
    const min_danceability = Number(searchParams.get("min_danceability"));
    const max_danceability = Number(searchParams.get("max_danceability"));
    const min_valence = Number(searchParams.get("min_valence"));
    const max_valence = Number(searchParams.get("max_valence"));
    const min_tempo = Number(searchParams.get("min_tempo"));
    const max_tempo = Number(searchParams.get("max_tempo"));
    const min_acousticness = Number(searchParams.get("min_acousticness"));
    const max_acousticness = Number(searchParams.get("max_acousticness"));

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
        url.searchParams.set("min_energy", min_energy.toString());
        url.searchParams.set("max_energy", max_energy.toString());
        url.searchParams.set("min_danceability", min_danceability.toString());
        url.searchParams.set("max_danceability", max_danceability.toString());
        url.searchParams.set("min_valence", min_valence.toString());
        url.searchParams.set("max_valence", max_valence.toString());
        url.searchParams.set("min_tempo", min_tempo.toString());
        url.searchParams.set("max_tempo", max_tempo.toString());
        url.searchParams.set("min_acousticness", min_acousticness.toString());
        url.searchParams.set("max_acousticness", max_acousticness.toString());

        for (const [key, value] of Object.entries(params)) {
            url.searchParams.set(key, value.toString());
        }

        router.push(url.toString(), {
            scroll: false,
        });
    }

    return (
        <div className="p-8 rounded-lg border-[1px] border-primary">
            <h4 className="mb-2 font-bold text-xl">Filter Tracks</h4>
            <form className="space-y-2">
                {data.map((item) => (
                    <>
                        <fieldset key={item.value.min}>
                            <label className="uppercase text-xs">{item.name}</label>
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
                        <div className="flex items-center gap-4 justify-between text-xs mt-1 text-muted-foreground">
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
