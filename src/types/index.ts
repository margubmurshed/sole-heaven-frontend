import type { ComponentType } from "react";

export type {
    ISendOTP,
    IVerifyOTP,
    ILoginInfo,
    ILoginResponseData,
    IRegisterInfo,
    IRegisterResponseData
} from "./auth.type";

export interface IResponse<T> {
    statusCode: number,
    success: boolean,
    message: string,
    data: T
}

export interface IAllDataResponse<T> extends IResponse<T> {
    meta: {
        total: number;
        page: number;
        limit:  number;
        totalPages: number;
    }
}

export interface ISidebarItem {
    title: string;
    url: string;
    items: {
        title: string,
        url: string,
        component: ComponentType
    }[]
}

export type TRole = "SUPER_ADMIN" | "ADMIN" | "USER";
export type TActiveStatus = "ACTIVE" | "INACTIVE" | "BLOCKED";

export interface IUser {
    _id: string,
    name: string;
    email: string;
    password?: string;
    role: TRole;
    phone?: string;
    picture?: string;
    address?: string;
    isDeleted?: boolean;
    isActive?: TActiveStatus;
    isVerified?: boolean;
    bookings?: string[];
    guides?: string[];
}
