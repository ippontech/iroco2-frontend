import { z } from "zod";

export const RegionSchema = z.object({
  name: z.string(),
  csp: z.string().uuid(),
  id: z.string().uuid(),
});

export type Region = z.infer<typeof RegionSchema>;
