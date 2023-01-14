import z from 'zod';

export const updateVideoSchema = {
  body: z.object({
    title: z.string(),
    description: z.string(),
    published: z.boolean(),
  }),

  params: z.object({
    videoId: z.string(),
  }),
};

export type UpdateVideoSchema = z.TypeOf<typeof updateVideoSchema.body>;
export type UpdateVideoParams = z.TypeOf<typeof updateVideoSchema.params>;
