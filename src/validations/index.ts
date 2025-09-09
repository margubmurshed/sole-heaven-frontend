import z from "zod";

export const BDPhoneNumberSchema = z
    .string({ error: "Phone Number must be string" })
    .regex(/^(?:\+8801\d{9}|01\d{9})$/, {
        message: "Phone number must be valid for Bangladesh. Format: +8801XXXXXXXXX or 01XXXXXXXXX",
})