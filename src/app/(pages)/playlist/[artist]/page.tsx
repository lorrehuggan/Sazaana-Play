import ArtistBlock from '@/components/playlist/ArtistBlock';
import ResultBlock from '@/components/playlist/ResultBlock';
import RowTwo from '@/components/playlist/RowTwo';
import { BASE_PATH } from '@/lib/env/server';
import { getAccessToken } from '@/lib/service/auth';
import { SpotifySearchArtist } from '@/lib/service/spotify/artist';
import type { SearchParams } from '@/types';
import { Suspense } from 'react';

type Props = {
    params: {
        artist: string;
    };
    searchParams: SearchParams;
};

export default async function Page({ params, searchParams }: Props) {
    const accessToken = await getAccessToken();

    if (!accessToken) return <div>Access token not found</div>;

    const artist = await SpotifySearchArtist(params.artist.trim(), accessToken);

    if (!artist) return <div>Artist not found</div>;

    const url = new URL(`${BASE_PATH}/playlist/${params.artist}`);

    url.searchParams.set('seed_artists', artist.items[0].id);
    url.searchParams.set('min_energy', '0');
    url.searchParams.set('max_energy', '1');
    url.searchParams.set('min_danceability', '0');
    url.searchParams.set('max_danceability', '1');
    url.searchParams.set('min_valence', '0');
    url.searchParams.set('max_valence', '1');
    url.searchParams.set('min_tempo', '0');
    url.searchParams.set('max_tempo', '200');
    url.searchParams.set('min_acousticness', '0');
    url.searchParams.set('max_acousticness', '1');

    return (
        <>
            <div className="mx-auto mt-4 w-11/12 max-w-5xl grid grid-cols-5 grid-rows-2 md:grid-rows-1 gap-4 h-[480px] md:h-[380px]">
                <ArtistBlock artist={artist} playlistHref={url.toString()} />
                <ResultBlock artist={artist} />
            </div>
            {searchParams.seed_artists && (
                <Suspense
                    fallback={
                        <div className="mx-auto mt-4 w-11/12 max-w-5xl">
                            <h4 className="font-bold">Compiling Playlist...</h4>
                        </div>
                    }
                >
                    <RowTwo searchParams={searchParams} />
                </Suspense>
            )}
        </>
    );
}
