'use client';

import Tracklist from './Tracklist';
import type { Track } from '@/types';

type Props = {
  playlist: Track[];
};

export default function PlaylistBlock({ playlist }: Props) {
  return <Tracklist playlist={playlist} />;
}
