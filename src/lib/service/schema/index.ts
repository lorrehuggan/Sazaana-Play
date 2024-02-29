import { z } from 'zod';

export const submitSearchSchema = z.object({
  artist: z
    .string()
    .trim()
    .min(1, { message: 'Artist name is required' })
    .max(64, { message: 'Artist name is too long' }),
});

export const saveTracksSchema = z.object({
  title: z.string().trim().min(1, { message: 'Title is required' }),
});
