import { type RootState } from "@/redux/store";
import { incrementQty, decrementQty, removeItem } from "@/redux/features/cart/cart.slice";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import emptyCartImage from "@/assets/images/empty-cart.png"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MinusIcon, PlusIcon, XIcon } from "lucide-react";

export default function Cart() {
    const dispatch = useAppDispatch();
    const cartItems = useAppSelector((state: RootState) => state.cart.items);

    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const shippingCost = cartItems.length > 0 ? 100 : 0; // Example shipping
    const total = subtotal + shippingCost;

    if (cartItems.length === 0) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-10 text-center">
                <img src={emptyCartImage} alt="empty-cart-image" className="mx-auto" />
                <h2 className="text-4xl font-bold mb-4 text-gray-400">Your cart is empty</h2>
                <Link to="/shop">
                    <Button>Go to Shop</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold mb-8 text-center">Cart</h1>
            <div className="grid md:grid-cols-3 gap-6">
                {/* Cart Items */}
                <div className="md:col-span-2 overflow-y-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">Product Details</TableHead>
                                <TableHead className="text-center">Quantity</TableHead>
                                <TableHead className="text-center">Price</TableHead>
                                <TableHead className="text-center">Total</TableHead>
                                <TableHead className="text-center"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody className="border">
                            {
                                cartItems.map((item, index) => (
                                    <TableRow key={index} className="">
                                        <TableCell className="w-1/2">
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={item.featuredImage}
                                                    alt={item.name}
                                                    className="h-24 w-24 object-cover rounded-md"
                                                />
                                                <div>
                                                    <h3 className="text-[18px] font-medium text-wrap">{item.name}</h3>
                                                    <p className="text-gray-500">Size: {item.size}</p>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex justify-center items-center gap-2 mt-2">
                                                <Button
                                                    size="sm"
                                                    className="bg-transparent text-primary shadow-none text-xl hover:text-white rounded-md"
                                                    onClick={() => dispatch(decrementQty({ productId: item.productId, size: item.size }))}
                                                >
                                                    <MinusIcon />
                                                </Button>
                                                <span className="px-3 py-2 border rounded">{item.quantity}</span>
                                                <Button
                                                    size="sm"
                                                    className="bg-transparent text-primary shadow-none text-xl hover:text-white rounded-md"
                                                    onClick={() => dispatch(incrementQty({ productId: item.productId, size: item.size }))}
                                                >
                                                    <PlusIcon />
                                                </Button>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            ৳{item.price}
                                        </TableCell>
                                        <TableCell className="text-center">
                                            ৳{item.price * item.quantity}
                                        </TableCell>
                                        <TableCell>
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() => dispatch(removeItem({ productId: item.productId, size: item.size }))}
                                            >
                                                <XIcon />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </div>

                {/* Summary */}
                <div className="flex flex-col gap-4 p-10 border rounded-md sticky top-10 h-fit">
                    <h2 className="text-xl font-semibold">Cart Summary</h2>
                    <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>{subtotal} Taka</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Shipping</span>
                        <span>{shippingCost} Taka</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span>{total} Taka</span>
                    </div>
                    <Link to="/checkout">
                        <Button className="w-full mt-4 py-6">Proceed to Checkout</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
