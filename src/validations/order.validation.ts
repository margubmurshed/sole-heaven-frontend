import z from "zod";
import { BDPhoneNumberSchema } from "./index";

export const PAYMENT_METHODS = ["COD", "SSLCOMMERZ"] as const;
export const ORDER_STATUS = {
  PENDING: "PENDING",
  CONFIRMED: "CONFIRMED",
  SHIPPED: "SHIPPED",
  DELIVERED: "DELIVERED",
  CANCELLED: "CANCELLED",
  FAILED: "FAILED",
} as const;

// Billing address schema
export const billingAddressSchema = z.object({
    name: z.string().nonempty("Name is required"),
    phone: BDPhoneNumberSchema.nonempty("Phone is required"),
    address: z.string().nonempty("Address is required"),
    city: z.string().nonempty("City is required"),
    district: z.string().nonempty("District is required"),
    postalCode: z.string().optional(),
});

export const orderProductSchema = z.object({
    product: z.string().nonempty("Name is required"),
    quantity: z.number().int().positive("Quantity must be positive"),
    size: z.number().positive("Quantity must be positive")
});

// Create Order Schema
export const createOrderSchema = z.object({
    products: z.array(orderProductSchema).min(1, "At least one product is required"),
    shippingCost: z.number().nonnegative("Total amount must be non-negative"),
    paymentMethod: z.enum(PAYMENT_METHODS),
    billingAddress: billingAddressSchema,
});

export const updateOrderSchema = z.object({
  orderStatus: z.nativeEnum(ORDER_STATUS).optional(),
  billingAddress: billingAddressSchema.partial().optional(),
  shippingCost: z.number().nonnegative("Total amount must be non-negative").optional()
});