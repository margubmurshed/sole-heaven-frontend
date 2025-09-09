import { useNavigate } from "react-router";
import { type RootState } from "@/redux/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { useCreateOrderMutation } from "@/redux/features/order/order.api";
import { useAppSelector } from "@/redux/hooks";
import flag from "@/assets/images/flag.png";
import SSLCOMMERZ from "@/assets/icons/SSLCOMMERZ.svg";
import RadioSelect from "@/components/custom/RadioSelect";
import { Truck } from "lucide-react";
import { clearCart } from "@/redux/features/cart/cart.slice";
import { createOrderSchema } from "@/validations/order.validation";

export default function Checkout() {
    const cartItems = useAppSelector((state: RootState) => state.cart.items);
    const [createOrder, { isLoading }] = useCreateOrderMutation();
    const navigate = useNavigate();

    const shippingCost = 100
    const subTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
    const totalAmount = subTotal + shippingCost;

    // Prepare default form values
    const form = useForm({
        resolver: zodResolver(createOrderSchema),
        defaultValues: {
            products: cartItems.map((item) => ({
                product: item.productId,
                quantity: item.quantity,
                size: item.size,
            })),
            shippingCost,
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
        mode: "onTouched"
    });

    // useEffect(() => {
    //     console.log(form.formState.errors);
    // }, [form.formState.errors]);

    const SSLCommerzIcon: React.FC<React.ImgHTMLAttributes<HTMLImageElement>> = (props) => (
        <img src={SSLCOMMERZ} alt="SSLCommerz" {...props} />
    );

    const options = [
        { icon: Truck, text: 'Cash On Delivery', value: 'COD' },
        { icon: SSLCommerzIcon, text: 'SSLCOMMERZ', value: 'SSLCOMMERZ' },
    ];

    const onSubmit = async (data: z.infer<typeof createOrderSchema>) => {
        if (cartItems.length === 0) return toast.error("Your cart is empty");

        try {
            const response = await createOrder(data).unwrap();
            console.log(response);
            if(response.success){
                if(response.data.paymentURL){
                    window.open(response.data.paymentURL, "_blank")
                } else{
                    clearCart();
                }
                toast.success("Order placed successfully!");
                navigate("/user/orders");
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.log(error)
            toast.error(error?.data?.message || "Failed to place order");
        }
    };

    return (
        <main className="px-4 py-10">

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 container mx-auto">
                        {/* Billing Address */}
                        <div>
                            <h1 className="text-3xl font-bold mb-8">Checkout</h1>
                            <h2 className="text-xl font-semibold mb-4">Billing Address</h2>
                            <div className="space-y-5">
                                <FormField
                                    control={form.control}
                                    name="billingAddress.name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Full Name</FormLabel>
                                            <FormControl>
                                                <Input className="py-6 px-4 shadow-none placeholder:text-gray-500" {...field} placeholder="Enter your full name" />
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
                                                <div className="relative">
                                                    <Input className="py-6 pl-4 pr-16 shadow-none placeholder:text-gray-500" placeholder="Ex. 01988474979" {...field} />
                                                    <img src={flag} alt="bangladesh_flag" className="w-10 absolute bottom-1 right-4" />
                                                </div>
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
                                                <Input className="py-6 px-4 shadow-none placeholder:text-gray-500" placeholder="Enter your full address" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                                    <FormField
                                        control={form.control}
                                        name="billingAddress.district"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>District</FormLabel>
                                                <FormControl>
                                                    <Input className="py-6 px-4 shadow-none placeholder:text-gray-500" placeholder="Enter district name" {...field} />
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
                                                    <Input className="py-6 px-4 shadow-none placeholder:text-gray-500" placeholder="Enter city name" {...field} />
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
                                                    <Input className="py-6 px-4 shadow-none placeholder:text-gray-500" placeholder="Enter postal code" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 p-5 lg:p-10 rounded-md flex flex-col justify-center">
                            <div className="">
                                <h2 className="text-xl font-semibold mb-10">Review your cart</h2>
                                <ul className="space-y-3">
                                    {cartItems.map((item) => (
                                        <li key={`${item.productId}-${item.size}`} className="flex gap-3">
                                            <div>
                                                <img src={item.featuredImage} alt={item.name} className="w-20 h-20 object-cover rounded-md border" />
                                            </div>
                                            <div className="flex flex-col justify-between">
                                                <div>
                                                    <p className="font-semibold text-sm lg:text-base">{item.name}</p>
                                                    <p className="font-semibold text-sm lg:text-base">(Size: {item.size})</p>
                                                    <p className="text-sm text-gray-500">X {item.quantity}</p>
                                                </div>
                                                <p className="font-semibold">৳{item.price * item.quantity}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                                <div className="my-10 space-y-3">
                                    <div className="flex justify-between">
                                        <span className="font-semibold text-gray-500 text-sm">Subtotal</span>
                                        <span className="font-bold">৳{subTotal}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="font-semibold text-gray-500 text-sm">Shipping</span>
                                        <span className="font-bold">৳{shippingCost}</span>
                                    </div>
                                    <div className="flex justify-between text-lg font-bold">
                                        <span className="font-semibold">Total</span>
                                        <span className="font-bold">৳{totalAmount}</span>
                                    </div>
                                </div>
                            </div>
                            <FormField
                                control={form.control}
                                name="paymentMethod"
                                render={({ field }) => (
                                    <FormItem className="space-y-3">
                                        <FormLabel>Payment Method</FormLabel>
                                        <FormControl>
                                            <RadioSelect
                                                options={options}
                                                selected={field.value}
                                                onChange={field.onChange}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" disabled={isLoading} className="w-full mt-6 py-6">
                                {isLoading ? "Processing..." : "Place Order"}
                            </Button>
                        </div>
                    </div>

                </form>
            </Form>
        </main>
    );
}
