import { z } from 'zod';

export const userSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name must be less than 100 characters'),
  age: z.number()
    .min(0, 'Age must be positive')
    .max(150, 'Age must be less than 150'),
});

export type UserInput = z.infer<typeof userSchema>;