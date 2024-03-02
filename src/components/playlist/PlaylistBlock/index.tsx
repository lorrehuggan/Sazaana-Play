import Tracklist from './Tracklist';
import type { Track } from '@/types';
import { Suspense } from 'react';

type Props = {
  playlist: Track[];
};

export default async function PlaylistBlock({ playlist }: Props) {
  return <Tracklist playlist={playlist} />;
}
