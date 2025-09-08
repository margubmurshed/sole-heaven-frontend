import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
    productId: string;
    name: string;
    price: number;
    size: number;
    quantity: number;
    featuredImage: string;
}

interface CartState {
    items: CartItem[];
}

const initialState: CartState = { items: [] };

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItem(state, action: PayloadAction<CartItem>) {
            const existing = state.items.find(
                (i) => i.productId === action.payload.productId && i.size === action.payload.size
            );
            if (existing) existing.quantity += action.payload.quantity;
            else state.items.push(action.payload);
        },
        removeItem(state, action: PayloadAction<{ productId: string; size: number }>) {
            state.items = state.items.filter(
                (i) => !(i.productId === action.payload.productId && i.size === action.payload.size)
            );
        },
        incrementQty(state, action: PayloadAction<{ productId: string; size: number }>) {
            const item = state.items.find(
                (i) => i.productId === action.payload.productId && i.size === action.payload.size
            );
            if (item) item.quantity += 1;
        },
        decrementQty(state, action: PayloadAction<{ productId: string; size: number }>) {
            const item = state.items.find(
                (i) => i.productId === action.payload.productId && i.size === action.payload.size
            );
            if (item && item.quantity > 1) item.quantity -= 1;
        },
    },
});

export const { addItem, removeItem, incrementQty, decrementQty } = cartSlice.actions;
export default cartSlice.reducer;
