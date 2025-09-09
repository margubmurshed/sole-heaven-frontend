import { baseApi } from "@/redux/baseApi";
import type { IAllDataResponse, IResponse, } from "@/types";
import type { ICreateOrderInfo, IOrderResponseData, IUpdateOrderInfo } from "@/types/order.type";

export const productApi = baseApi.injectEndpoints({
    endpoints(build) {
        return {
            createOrder: build.mutation<IResponse<IOrderResponseData>, ICreateOrderInfo>({
                query: (orderInfo) => ({
                    url: "/order",
                    method: "POST",
                    data: orderInfo
                }),
                invalidatesTags: ["ORDER"]
            }),
            getOrders: build.query<IAllDataResponse<IOrderResponseData[]>, unknown>({
                query: (params) => ({
                    url: "/order",
                    method: "GET",
                    params
                }),
                providesTags: ["ORDER"]
            }),
            getSingleOrder: build.query<IResponse<IOrderResponseData>, IUpdateOrderInfo>({
                query: (orderInfo) => ({
                    url: `/order/${orderInfo._id}`,
                    method: "GET",
                }),
                providesTags: ["ORDER"]
            }),
            updateOrder: build.mutation<IResponse<IOrderResponseData>, IUpdateOrderInfo>({
                query: (orderInfo) => ({
                    url: `/order/${orderInfo._id}`,
                    method: "PATCH",
                    data: orderInfo
                }),
                invalidatesTags: ["ORDER"]
            }),
            deleteOrder: build.mutation<IResponse<null>, IUpdateOrderInfo>({
                query: (orderInfo) => ({
                    url: `/order/${orderInfo._id}`,
                    method: "DELETE",
                    data: orderInfo
                }),
                invalidatesTags: ["ORDER"]
            }),
        }
    },
})

export const {
    useCreateOrderMutation,
    useUpdateOrderMutation,
    useGetOrdersQuery,
    useDeleteOrderMutation,
    useGetSingleOrderQuery
} = productApi;