import { baseApi } from "@/redux/baseApi";
import type { IAllDataResponse, IResponse,} from "@/types";
import type { ICategoryResponseData, IUpdateCategoryInfo } from "@/types/category.type";

export const categoryApi = baseApi.injectEndpoints({
    endpoints(build) {
        return {
            createCategory: build.mutation<IResponse<ICategoryResponseData>, FormData>({
                query: (userInfo) => ({
                    url: "/product/category/create",
                    method: "POST",
                    data: userInfo
                }),
                invalidatesTags: ["CATEGORY"]
            }),
            getCategories: build.query<IAllDataResponse<ICategoryResponseData[]>, unknown>({
                query: (params) => ({
                    url: "/product/category",
                    method: "GET",
                    params
                }),
                providesTags: ["CATEGORY"]
            }),
            getSingleCategory: build.query<IResponse<ICategoryResponseData>, IUpdateCategoryInfo>({
                query: (categoryInfo) => ({
                    url: `/product/category/${categoryInfo._id}`,
                    method: "GET",
                }),
                providesTags: ["CATEGORY"]
            }),
            updateCategory: build.mutation<IResponse<ICategoryResponseData>, {_id:string, formData: FormData}>({
                query: (categoryInfo) => ({
                    url: `/product/category/${categoryInfo._id}`,
                    method: "PATCH",
                    data: categoryInfo.formData
                }),
                invalidatesTags: ["CATEGORY"]
            }),
            deleteCategory: build.mutation<IResponse<null>, IUpdateCategoryInfo>({
                query: (categoryInfo) => ({
                    url: `/product/category/${categoryInfo._id}`,
                    method: "DELETE",
                    data: categoryInfo
                }),
                invalidatesTags: ["CATEGORY"]
            }),
        }
    },
})

export const {
    useCreateCategoryMutation,
    useUpdateCategoryMutation,
    useGetCategoriesQuery,
    useDeleteCategoryMutation,
    useGetSingleCategoryQuery
} = categoryApi;