'use client';

import Tracklist from './Tracklist';
import { Track } from '@/types';

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
  return <Tracklist playlist={playlist} />;
}
