import { useDispatch, useSelector } from "react-redux";
import { type RootState } from "@/redux/store";
import { incrementQty, decrementQty, removeItem } from "@/redux/features/cart/cart.slice";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router";

export default function Cart() {
    const dispatch = useDispatch();
    const cartItems = useSelector((state: RootState) => state.cart.items);

    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const shippingCost = cartItems.length > 0 ? 100 : 0; // Example shipping
    const total = subtotal + shippingCost;

    if (cartItems.length === 0) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-10 text-center">
                <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
                <Link to="/shop">
                    <Button>Go to Shop</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-3 gap-6">
            {/* Cart Items */}
            <div className="md:col-span-2 flex flex-col gap-4">
                {cartItems.map((item) => (
                    <Card key={item.productId} className="flex flex-row gap-4 items-center p-4">
                        <img
                            src={item.featuredImage}
                            alt={item.name}
                            className="h-24 w-24 object-cover rounded"
                        />
                        <div className="flex-1">
                            <CardHeader>
                                <CardTitle>{item.name}</CardTitle>
                            </CardHeader>
                            <p>Size: {item.size}</p>
                            <p>Price: {item.price} Taka</p>
                            <div className="flex gap-2 mt-2">
                                <Button
                                    size="sm"
                                    onClick={() => dispatch(decrementQty({ productId: item.productId, size: item.size }))}
                                >
                                    -
                                </Button>
                                <span className="px-2 py-1 border rounded">{item.quantity}</span>
                                <Button
                                    size="sm"
                                    onClick={() => dispatch(incrementQty({ productId: item.productId, size: item.size }))}
                                >
                                    +
                                </Button>
                                <Button
                                    size="sm"
                                    variant="destructive"
                                    onClick={() => dispatch(removeItem({ productId: item.productId, size: item.size }))}
                                >
                                    Remove
                                </Button>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Summary */}
            <div className="flex flex-col gap-4 p-4 border rounded-md">
                <h2 className="text-xl font-semibold">Order Summary</h2>
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
                    <Button className="w-full mt-4">Proceed to Checkout</Button>
                </Link>
            </div>
        </div>
    );
}
