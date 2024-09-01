"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { submitSearchAction } from "@/lib/actions/artist";
import { submitSearchSchema } from "@/lib/service/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef } from "react";
import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function SearchForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction] = useFormState(submitSearchAction, {
    artist: "",
  });

  const form = useForm<z.output<typeof submitSearchSchema>>({
    resolver: zodResolver(submitSearchSchema),
    defaultValues: {
      artist: "",
    },
  });

  return (
    <Form {...form}>
      <form
        ref={formRef}
        action={formAction}
        onSubmit={form.handleSubmit(() => formRef.current?.submit())}
        className="mt-4 flex w-full items-center gap-2"
      >
        <FormField
          control={form.control}
          name="artist"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel htmlFor="artist">Enter artist name</FormLabel>
              <FormControl>
                <div className="flex items-center gap-2">
                  <Input
                    {...field}
                    placeholder="Taylor Swift"
                    className="w-full bg-neutral-100"
                  />
                  <Button type="submit" variant="outline">
                    Find Artist
                  </Button>
                </div>
              </FormControl>
              <FormDescription>
                Build a playlist based on your favorite artist
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
