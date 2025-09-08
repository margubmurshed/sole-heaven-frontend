export interface IProductResponseData {
    _id: string,
    name: string;
    slug: string;
    shortDescription: string;
    brand: string;
    description: string;
    price: number;
    sku: string;
    sizes: number[];
    stock: number;
    featuredImage: string;
    images: string[];
    sizeChartImage?: string;
    category: {
        _id: string;
        name: string;
    };
    createdAt: Date;
    updatedAt: Date;
}

export interface ICreateProductInfo {
    name: string;
    slug: string;
    shortDescription: string;
    brand: string;
    description: string;
    price: number;
    sku: string;
    sizes: number[];
    stock: number;
    category: string;
}

export interface IUpdateProductInfo {
    _id?: string;
    name?: string;
    slug?: string;
    shortDescription?: string;
    brand?: string;
    description?: string;
    price?: number;
    sku?: string;
    sizes?: number[];
    stock?: number;
    category?: string;
    deletedImages?: string[];
}