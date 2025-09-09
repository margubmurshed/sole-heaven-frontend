import z from "zod"
import { BDPhoneNumberSchema } from ".";

export const passwordSchema = z
    .string({ error: "Password must be string" })
    .min(8, { message: "Password must be at least 8 characters long." })
    .regex(/^(?=.*[A-Z])/, {
        message: "Password must contain at least 1 uppercase letter.",
    })
    .regex(/^(?=.*[!@#$%^&*])/, {
        message: "Password must contain at least 1 special character.",
    })
    .regex(/^(?=.*\d)/, {
        message: "Password must contain at least 1 number.",
    })

export const updatePasswordSchema = z.object({
    password: passwordSchema
})

export const registerFormSchema = z.object({
    name: z
        .string({ error: "Name must be string" })
        .min(2, { message: "Name must be at least 2 characters long." })
        .max(50, { message: "Name cannot exceed 50 characters." }),
    phone: BDPhoneNumberSchema,
    email: z
        .string({ error: "Email must be string" })
        .email({ message: "Invalid email address format." })
        .min(5, { message: "Email must be at least 5 characters long." })
        .max(100, { message: "Email cannot exceed 100 characters." }),
    password: passwordSchema,
})

export const updateUserZodSchema = registerFormSchema.partial().omit({ email: true, phone: true });