import { Badge } from "@/components/custom/Badge"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useGetSingleOrderQuery, useUpdateOrderMutation } from "@/redux/features/order/order.api"
import { ORDER_STATUS, updateOrderSchema } from "@/validations/order.validation"
import { zodResolver } from "@hookform/resolvers/zod"
import { PencilIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import z from "zod"

export function UpdateOrderModal({ orderID }: { orderID: string }) {
    const { data: order, isLoading: orderLoading } = useGetSingleOrderQuery({ _id: orderID });
    const [updateOrder, { isLoading: updateOrderLoading }] = useUpdateOrderMutation();
    const [open, setOpen] = useState(false);

    const form = useForm({
        resolver: zodResolver(updateOrderSchema),
        defaultValues: {
            orderStatus: ORDER_STATUS.PENDING,
            billingAddress: {
                name: "",
                phone: "",
                address: "",
                district: "",
                city: "",
                postalCode: "",
            },
            shippingCost: 0
        },
    });

    useEffect(() => {
        if (order?.data) {
            form.reset({
                orderStatus: order.data.orderStatus,
                billingAddress: order.data.billingAddress,
                shippingCost: order.data.shippingCost,
            })
        }
    }, [form, order])

    const onSubmit = async (data: z.infer<typeof updateOrderSchema>) => {
        try {
            await updateOrder({ _id: orderID, ...data }).unwrap();
            toast.success("Category updated successfully!");
            setOpen(false);
            form.reset();
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error("Failed to add tour type:", error);
            // Optionally, you can show a toast or notification here
            toast.error(error?.data?.message || "Failed to add tour type");
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                    <PencilIcon />Edit
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[1000px] max-h-[calc(100vh-40px)] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Order Details</DialogTitle>
                    <DialogDescription>
                        Order ID : {order?.data._id}
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4">
                    <div className="grid gap-3">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                                    <FormField
                                        control={form.control}
                                        name="orderStatus"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Order Status</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value ?? undefined} disabled={orderLoading}>
                                                    <FormControl>
                                                        <SelectTrigger className="w-full">
                                                            <SelectValue placeholder="Select a status" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {Object.values(ORDER_STATUS).map((type, idx) => (
                                                            <SelectItem key={idx} value={type}>
                                                                {type}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="shippingCost"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Shipping Cost</FormLabel>
                                                <FormControl>
                                                    <Input type="number" disabled={orderLoading} placeholder="Enter shipping cost"
                                                        {...field}
                                                        onChange={e => field.onChange(Number(e.target.value))}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
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
                                <div>
                                    <h3 className="font-semibold text-xl mb-3">Items</h3>
                                    <ul className="space-y-3">
                                        {order?.data.products.map((item) => (
                                            <li key={`${item.product._id}-${item.size}`} className="flex gap-3">
                                                <div>
                                                    <img src={item.product.featuredImage} alt={item.product.name} className="w-20 h-20 object-cover rounded-md border" />
                                                </div>
                                                <div className="flex items-center justify-between flex-1">
                                                    <div>
                                                        <p className="font-semibold text-sm lg:text-base">{item.product.name}</p>
                                                        <p className="font-semibold text-sm lg:text-base">(Size: {item.size})</p>
                                                        <p className="text-sm text-gray-500">X {item.quantity}</p>
                                                    </div>
                                                    <p className="font-semibold">৳{item.product.price * item.quantity}</p>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="mt-5">
                                        <h3 className="font-semibold text-xl mb-3">Payment</h3>
                                        <div className="space-y-2">
                                            <p>Total Amount: <b>৳{order?.data.totalAmount}</b></p>
                                            <p>Payment Method: <b>{order?.data.paymentMethod}</b></p>
                                            {order?.data.payment && (
                                                <div className="space-y-2">
                                                    <p>Trx ID: <b>{order?.data.payment.transactionId}</b></p>
                                                    <p>Status: <Badge variant={order?.data.payment.status === "PAID" ? "success" : "default"}>{order?.data.payment.status}</Badge></p>
                                                    {order?.data.payment.invoiceUrl && <a href={order?.data.payment.invoiceUrl} target="_blank"><Button>View Invoice</Button></a>}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <DialogFooter>
                                    <DialogClose asChild>
                                        <Button variant="outline">Cancel</Button>
                                    </DialogClose>
                                    <Button type="submit" disabled={orderLoading || updateOrderLoading}>Update Order</Button>
                                </DialogFooter>
                            </form>
                        </Form>
                    </div>
                </div>

            </DialogContent>
        </Dialog>
    )
}
