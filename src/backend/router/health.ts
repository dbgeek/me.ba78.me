import { z } from "zod";

import { prisma } from "../../db/client";
import { createRouter } from "./context";

export const healthRouter = createRouter()
  .query("get-all-weight", {
    input: z.object({
      skip: z.number(),
      take: z.number(),
    }),
    async resolve({ input }) {
      return await prisma.weight.findMany({
        orderBy: [{
          createdAt: 'desc'
        }],
        skip: input.skip,
        take: input.take,
      });
    },
  })
  .mutation("create", {
    input: z.object({
      weight: z.number().min(10).max(200),
      comment: z.string().min(0).max(200),
    }),
    async resolve({ input }) {
      return await prisma.weight.create({
        data: {
          weight: input.weight,
          comment: input.comment,
        },
      });
    },
  });;
