import { z } from "zod";

export const createWeightValidator = z.object({
  weight: z.number().min(10).max(200),
  comment: z.string().min(0).max(200),
});

export type CreateWeightInputType = z.infer<typeof createWeightValidator>;
