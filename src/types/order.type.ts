export interface IOrderResponseData {
    _id: string;
    user: {
        _id: string;
        name: string;
        email:string;
    };
    products: {
        product: {
            _id: string;
            name: string;
            price: number;
            featuredImage:string;
        };
        quantity: number;
        size: number;
    }[];
    totalAmount: number;
    shippingCost: number;
    paymentMethod: "COD" | "SSLCOMMERZ";
    payment?: {
        _id:string;
        status: string;
        amount: number;
        transactionId: string;
        invoiceUrl?: string;
    };
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
    shippingCost?: number;
    orderStatus?: "PENDING"
    | "CONFIRMED"
    | "SHIPPED"
    | "DELIVERED"
    | "CANCELLED"
    | "FAILED";
    billingAddress?: {
        name?: string;
        phone?: string;
        address?: string;
        district?: string;
        city?: string;
        postalCode?: string;
    };
}