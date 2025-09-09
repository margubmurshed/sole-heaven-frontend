export interface IOrderResponseData {
    _id: string;
    user: string;
    products: {
        product: string;
        quantity: number;
        size: number;
    }[];
    totalAmount: number;
    shippingCost: number;
    paymentMethod: "COD" | "SSLCOMMERZ";
    payment?: string;
    orderStatus: "PENDING"
    | "CONFIRMED"
    | "SHIPPED"
    | "DELIVERED"
    | "CANCELLED"
    | "FAILED";
    billingAddress: {
        name: string;
        phone: string;
        address: string;
        district: string;
        city: string;
        postalCode?: string;
    };
    createdAt: Date;
    paymentURL?: string;
}

export interface ICreateOrderInfo {
    products: {
        product: string;
        quantity: number;
        size: number;
    }[];
    shippingCost: number;
    paymentMethod: "COD" | "SSLCOMMERZ";
    billingAddress: {
        name: string;
        phone: string;
        address: string;
        district: string;
        city: string;
        postalCode?: string;
    };
}

export interface IUpdateOrderInfo {
    _id: string;
    shippingCost: number;
    orderStatus: "PENDING"
    | "CONFIRMED"
    | "SHIPPED"
    | "DELIVERED"
    | "CANCELLED"
    | "FAILED";
    billingAddress: {
        name: string;
        phone: string;
        address: string;
        district: string;
        city: string;
        postalCode?: string;
    };
}