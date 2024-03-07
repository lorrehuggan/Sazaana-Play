'use client';

import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Progress } from '@/components/ui/progress';
import { Artist } from '@/types';
import {
  Pause,
  Play,
  Repeat2,
  Square,
  StepBack,
  StepForward,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import {
  AudioLoadOptions,
  useGlobalAudioPlayer,
  useAudioPlayer,
} from 'react-use-audio-player';

type Props = {
  audioLink: string;
  artist: string;
  title: string;
  album: string;
  spotifyLink: string;
};

export default function AudioPlayer({
  audioLink,
  artist,
  title,
  album,
  spotifyLink,
}: Props) {
  const {
    load,
    isReady,
    error,
    play,
    togglePlayPause,
    stop,
    playing,
    getPosition,
    duration,
    seek,
  } = useGlobalAudioPlayer();
  const [pos, setPos] = useState(0);
  const frameRef = useRef<number>();

  useEffect(() => {
    const animate = () => {
      setPos(getPosition());
      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = window.requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleLoad() {
    load(audioLink, {
      html5: true,
      format: 'mp3',
      autoplay: false,
    });
    if (isReady) {
      play();
    }
  }
  if (duration === Infinity) return null;

  return (
    <div className="w-14">
      <div className=" flex items-center justify-center gap-1">
        <Drawer onClose={() => stop()}>
          <DrawerTrigger>
            <Button variant="outline" onClick={handleLoad}>
              <Play size={14} />
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <div className="mx-auto w-11/12 max-w-96 pb-8">
              <DrawerHeader>
                <DrawerTitle className="line-clamp-1">
                  {playing
                    ? `Now Playing ${artist ?? ''} - ${title}`
                    : `Play ${artist ?? ''} - ${title}`}
                </DrawerTitle>
                <DrawerDescription>
                  {album && artist
                    ? `${album} - ${artist}`
                    : album ?? artist}
                </DrawerDescription>
              </DrawerHeader>
              <div className="flex w-full items-center justify-between gap-2 px-4">
                <Button onClick={togglePlayPause}>
                  {playing ? (
                    <Pause size={18} />
                  ) : (
                    <Play size={18} />
                  )}
                </Button>
                <Button
                  variant={
                    playing ? 'destructive' : 'default'
                  }
                  onClick={stop}
                >
                  <Square size={18} />
                </Button>
                <Button onClick={() => seek(pos - 5)}>
                  <StepBack size={18} />
                </Button>
                <Button onClick={() => seek(pos + 5)}>
                  <StepForward size={18} />
                </Button>
                <Button onClick={() => seek(0)}>
                  <Repeat2 size={18} />
                </Button>
                <Button asChild variant="outline">
                  <a href={spotifyLink} target="_blank">
                    <svg
                      className="fill-primary"
                      width="24"
                      height="24"
                      xmlns="http://www.w3.org/2000/svg"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    >
                      <path d="M19.098 10.638c-3.868-2.297-10.248-2.508-13.941-1.387-.593.18-1.22-.155-1.399-.748-.18-.593.154-1.22.748-1.4 4.239-1.287 11.285-1.038 15.738 1.605.533.317.708 1.005.392 1.538-.316.533-1.005.709-1.538.392zm-.126 3.403c-.272.44-.847.578-1.287.308-3.225-1.982-8.142-2.557-11.958-1.399-.494.15-1.017-.129-1.167-.623-.149-.495.13-1.016.624-1.167 4.358-1.322 9.776-.682 13.48 1.595.44.27.578.847.308 1.286zm-1.469 3.267c-.215.354-.676.465-1.028.249-2.818-1.722-6.365-2.111-10.542-1.157-.402.092-.803-.16-.895-.562-.092-.403.159-.804.562-.896 4.571-1.045 8.492-.595 11.655 1.338.353.215.464.676.248 1.028zm-5.503-17.308c-6.627 0-12 5.373-12 12 0 6.628 5.373 12 12 12 6.628 0 12-5.372 12-12 0-6.627-5.372-12-12-12z" />
                    </svg>
                  </a>
                </Button>
              </div>
              <DrawerFooter>
                <Progress value={(pos / duration) * 100} />
              </DrawerFooter>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
}
