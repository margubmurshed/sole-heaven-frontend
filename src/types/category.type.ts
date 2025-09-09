export interface ICategoryResponseData {
    _id: string,
    name: string,
    description: string,
    parent: string | null,
    featuredImage: string | undefined
    createdAt: string,
}

export interface ICreateCategoryInfo {
    name: string;
    description: string;
    parent: null | string;
}

export interface IUpdateCategoryInfo {
    _id: string;
    name?: string;
    description?: string;
    parent?: null | string;
}