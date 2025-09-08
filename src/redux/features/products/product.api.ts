import { baseApi } from "@/redux/baseApi";
import type { IAllDataResponse, IResponse,} from "@/types";
import type { IProductResponseData, IUpdateProductInfo } from "@/types/product.type";

export const productApi = baseApi.injectEndpoints({
    endpoints(build) {
        return {
            createProduct: build.mutation<IResponse<IProductResponseData>, FormData>({
                query: (userInfo) => ({
                    url: "/product/create",
                    method: "POST",
                    data: userInfo
                }),
                invalidatesTags: ["PRODUCT"]
            }),
            getProducts: build.query<IAllDataResponse<IProductResponseData[]>, unknown>({
                query: (params) => ({
                    url: "/product",
                    method: "GET",
                    params
                }),
                providesTags: ["PRODUCT"]
            }),
            getSingleProduct: build.query<IResponse<IProductResponseData>, IUpdateProductInfo>({
                query: (productInfo) => ({
                    url: `/product/${productInfo.slug}`,
                    method: "GET",
                }),
                providesTags: ["PRODUCT"]
            }),
            updateProduct: build.mutation<IResponse<IProductResponseData>, {_id:string, FormData: FormData}>({
                query: (productInfo) => ({
                    url: `/product/${productInfo._id}`,
                    method: "PATCH",
                    data: productInfo.FormData
                }),
                invalidatesTags: ["PRODUCT"]
            }),
            deleteProduct: build.mutation<IResponse<null>, IUpdateProductInfo>({
                query: (productInfo) => ({
                    url: `/product/${productInfo._id}`,
                    method: "DELETE",
                    data: productInfo
                }),
                invalidatesTags: ["PRODUCT"]
            }),
        }
    },
})

export const {
    useCreateProductMutation,
    useUpdateProductMutation,
    useGetProductsQuery,
    useDeleteProductMutation,
    useGetSingleProductQuery
} = productApi;