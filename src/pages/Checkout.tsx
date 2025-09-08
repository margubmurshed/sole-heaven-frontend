import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { type RootState } from "@/redux/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z, { string } from "zod";
import { useCreateOrderMutation } from "@/redux/features/order/order.api";


const PAYMENT_METHODS = ["COD", "SSLCOMMERZ"] as const;

const BDPhoneNumberSchema = z
    .string({ error: "Phone Number must be string" })
    .regex(/^(?:\+8801\d{9}|01\d{9})$/, {
        message: "Phone number must be valid for Bangladesh. Format: +8801XXXXXXXXX or 01XXXXXXXXX",
    })

// Billing address schema
const billingAddressSchema = z.object({
    name: z.string().nonempty("Name is required"),
    phone: BDPhoneNumberSchema.nonempty("Phone is required"),
    address: z.string().nonempty("Address is required"),
    city: z.string().nonempty("City is required"),
    district: z.string().nonempty("District is required"),
    postalCode: z.string().optional(),
});

const orderProductSchema = z.object({
    product: string,
    quantity: z.number().int().positive("Quantity must be positive"),
    size: z.number().int().positive("Quantity must be positive")
});

// Create Order Schema
const createOrderSchema = z.object({
    products: z.array(orderProductSchema).min(1, "At least one product is required"),
    shippingCost: z.number().nonnegative("Total amount must be non-negative"),
    paymentMethod: z.enum(PAYMENT_METHODS),
    billingAddress: billingAddressSchema,
});

export default function Checkout() {
    const cartItems = useSelector((state: RootState) => state.cart.items);

    console.log(cartItems)
    const [createOrder, { isLoading }] = useCreateOrderMutation();
    const navigate = useNavigate();

    // Prepare default form values
    const form = useForm({
        resolver: zodResolver(createOrderSchema),
        defaultValues: {
            products: cartItems.map((item) => ({
                product: item.productId,
                quantity: item.quantity,
                size: item.size,
            })),
            shippingCost: 50, // fixed example shipping
            paymentMethod: "COD",
            billingAddress: {
                name: "",
                phone: "",
                address: "",
                district: "",
                city: "",
                postalCode: "",
            },
        },
    });

    const onSubmit = async (data: z.infer<typeof createOrderSchema>) => {
        if (cartItems.length === 0) return toast.error("Your cart is empty");

        const formData = new FormData();
        formData.append("data", JSON.stringify(data));

        try {
            await createOrder(formData).unwrap();
            toast.success("Order placed successfully!");
            navigate("/order-success");
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            toast.error(error?.data?.message || "Failed to place order");
        }
    };

    const totalAmount =
        cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0) + 50;

    return (
        <main className="max-w-4xl mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold mb-8">Checkout</h1>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {/* Billing Address */}
                    <FormField
                        control={form.control}
                        name="billingAddress.name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="billingAddress.phone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Phone</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="billingAddress.address"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Address</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="billingAddress.district"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>District</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="billingAddress.city"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>City</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="billingAddress.postalCode"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Postal Code</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Payment Method */}
                    <FormField
                        control={form.control}
                        name="paymentMethod"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Payment Method</FormLabel>
                                <FormControl>
                                    <select {...field} className="border rounded p-2 w-full">
                                        <option value="COD">Cash on Delivery</option>
                                        <option value="SSLCOMMERZ">SSLCOMMERZ</option>
                                    </select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Cart Summary */}
                    <div className="border-t pt-4">
                        <h2 className="text-xl font-semibold mb-2">Order Summary</h2>
                        <ul className="space-y-2">
                            {cartItems.map((item) => (
                                <li key={`${item.productId}-${item.size}`} className="flex justify-between">
                                    <span>{item.name} (Size: {item.size}) x {item.quantity}</span>
                                    <span>{item.price * item.quantity} Taka</span>
                                </li>
                            ))}
                        </ul>
                        <div className="flex justify-between mt-4 font-semibold">
                            <span>Shipping</span>
                            <span>50 Taka</span>
                        </div>
                        <div className="flex justify-between mt-2 text-lg font-bold">
                            <span>Total</span>
                            <span>{totalAmount} Taka</span>
                        </div>
                    </div>

                    <Button type="submit" disabled={isLoading} className="w-full mt-6">
                        {isLoading ? "Processing..." : "Place Order"}
                    </Button>
                </form>
            </Form>
        </main>
    );
}
