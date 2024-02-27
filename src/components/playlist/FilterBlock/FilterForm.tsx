'use client';

import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

const data = [
    {
        name: 'energy',
        min: 0,
        max: 1,
        step: 0.1,
        value: {
            min: 'min_energy',
            max: 'max_energy',
        },
    },
    {
        name: 'danceability',
        min: 0,
        max: 1,
        step: 0.1,
        value: {
            min: 'min_danceability',
            max: 'max_danceability',
        },
    },
    {
        name: 'valence',
        min: 0,
        max: 1,
        step: 0.1,
        value: {
            min: 'min_valence',
            max: 'max_valence',
        },
    },
    {
        name: 'tempo',
        min: 0,
        max: 200,
        step: 1,
        value: {
            min: 'min_tempo',
            max: 'max_tempo',
        },
    },
    {
        name: 'acousticness',
        min: 0,
        max: 1,
        step: 0.1,
        value: {
            min: 'min_acousticness',
            max: 'max_acousticness',
        },
    },
];

export default function FilterForm() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const seed = searchParams.get('seed_artists');

    // const url = new URL(`${pathname}`);

    function filterAction(params: Record<string, number>) {}

    return (
        <>
            <p className="mb-2 font-bold">Filter</p>
            <form className="space-y-4">
                {data.map((item) => (
                    <>
                        <fieldset key={item.name}>
                            <label className="uppercase text-xs">
                                {item.name}
                            </label>
                            <Slider
                                minStepsBetweenThumbs={0.1}
                                onValueCommit={(value) =>
                                    filterAction({
                                        [item.value.min]: value[0],
                                        [item.value.max]: value[1],
                                    })
                                }
                                name={item.name}
                                defaultValue={[item.min, item.max]}
                                max={item.max}
                                step={item.step}
                            />
                        </fieldset>
                        <Separator className="bg-foreground" />
                    </>
                ))}
            </form>
        </>
    );
}
