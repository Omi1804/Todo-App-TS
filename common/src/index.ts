import { z } from "zod";

export const UserDetails = z.object({
  username: z.string().email(),
  password: z.string().min(3).max(20),
});

export type SignupParams = z.infer<typeof UserDetails>; // --> to convert z.objec to Interface
