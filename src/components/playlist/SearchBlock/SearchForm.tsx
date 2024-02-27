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
import { submitSearchAction } from '@/lib/actions/artist';
import { submitSearchSchema } from '@/lib/service/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRef } from 'react';
import { useFormState } from 'react-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export default function SearchForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction] = useFormState(submitSearchAction, {
    artist: '',
  });

  const form = useForm<z.output<typeof submitSearchSchema>>({
    resolver: zodResolver(submitSearchSchema),
    defaultValues: {
      artist: '',
    },
  });

  return (
    <Form {...form}>
      <form
        ref={formRef}
        action={formAction}
        onSubmit={form.handleSubmit(() => formRef.current?.submit())}
        className="flex items-center gap-2 w-full mt-4"
      >
        <FormField
          control={form.control}
          name="artist"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel htmlFor="artist">
                Enter artist name
              </FormLabel>
              <FormControl>
                <div className="flex items-center gap-2">
                  <Input
                    {...field}
                    placeholder="Taylor Swift"
                    className="w-full"
                  />
                  <Button type="submit" variant="secondary">
                    Submit
                  </Button>
                </div>
              </FormControl>
              <FormDescription>
                Enter the name of the artist you want to build a
                playlist around.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
