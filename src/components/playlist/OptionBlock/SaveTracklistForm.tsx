'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { saveTracksAction } from '@/lib/actions/tracks';
import { saveTracksSchema } from '@/lib/service/schema';
import { Track } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useMemo, useRef } from 'react';
import { useFormState } from 'react-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

type Props = {
  playlist: Track[];
};

export default function SaveTrackilstForm({ playlist }: Props) {
  const ids = useMemo(() => playlist?.map((track) => track.uri), [playlist]);

  const form = useForm<z.output<typeof saveTracksSchema>>({
    resolver: zodResolver(saveTracksSchema),
    defaultValues: {
      title: '',
    },
  });

  const onSubmit: SubmitHandler<{
    title: string;
  }> = async (data) => {
    try {
      const response = fetch('/api/save', {
        method: 'POST',
        body: JSON.stringify({
          title: data.title,
          ids,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      toast.promise(response, {
        success: 'Playlist saved to Spotify',
        error: 'Error saving playlist',
        position: 'bottom-center',
        closeButton: true,
        duration: 9000,
        loading: 'Saving playlist...',
        action: {
          label: 'Open Spotify',
          onClick: () => {
            window.open(
              'https://open.spotify.com/collection/playlists',
            );
          },
        },
      });
      form.reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="rounded-lg border-[1px] border-foreground p-8">
      {/* <h4 className="font-bold text-xl mb-2">Save Playlist</h4> */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-2"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  htmlFor="title"
                  className="mb-2 text-xl font-bold"
                >
                  Save Playlist
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Playlist Name"
                    className="border-[1px] border-slate-900/30 bg-background"
                  />
                </FormControl>
                <FormDescription>
                  Enter a name for your playlist.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            disabled={form.formState.isSubmitting}
            className="flex w-full items-center gap-2"
          >
            <div className="flex items-center gap-2">
              <svg
                className="fill-white"
                width="24"
                height="24"
                xmlns="http://www.w3.org/2000/svg"
                fillRule="evenodd"
                clipRule="evenodd"
              >
                <path d="M19.098 10.638c-3.868-2.297-10.248-2.508-13.941-1.387-.593.18-1.22-.155-1.399-.748-.18-.593.154-1.22.748-1.4 4.239-1.287 11.285-1.038 15.738 1.605.533.317.708 1.005.392 1.538-.316.533-1.005.709-1.538.392zm-.126 3.403c-.272.44-.847.578-1.287.308-3.225-1.982-8.142-2.557-11.958-1.399-.494.15-1.017-.129-1.167-.623-.149-.495.13-1.016.624-1.167 4.358-1.322 9.776-.682 13.48 1.595.44.27.578.847.308 1.286zm-1.469 3.267c-.215.354-.676.465-1.028.249-2.818-1.722-6.365-2.111-10.542-1.157-.402.092-.803-.16-.895-.562-.092-.403.159-.804.562-.896 4.571-1.045 8.492-.595 11.655 1.338.353.215.464.676.248 1.028zm-5.503-17.308c-6.627 0-12 5.373-12 12 0 6.628 5.373 12 12 12 6.628 0 12-5.372 12-12 0-6.627-5.372-12-12-12z" />
              </svg>
              <span>Save to Spotify</span>
            </div>
          </Button>
        </form>
      </Form>
    </div>
  );
}
