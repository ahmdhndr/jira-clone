import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, 'Required!'),
});

export const registerSchema = z
  .object({
    name: z.string().min(1, 'Required!'),
    email: z.string().email(),
    password: z.string().min(8, 'Minimum of 8 characters!'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });