import { z } from "zod";

import { listStatuses } from "@/constants/listStatus";

export const entrySchema = z.object({
  status: z.enum(listStatuses),
  episodesWatched: z.coerce
    .number({ error: "Enter a whole number of episodes" })
    .int("Enter a whole number of episodes")
    .min(0, "Enter at least 0 episodes"),
  score: z.coerce.number({ error: "Enter a score from 1 to 10" })
    .min(1, "Enter a score from 1 to 10")
    .max(10, "Enter a score from 1 to 10")
    .optional(),
  notes: z.string().max(200, "Keep notes to 200 characters or fewer").optional(),
});
