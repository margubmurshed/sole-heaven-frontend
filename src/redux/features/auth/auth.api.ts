import { baseApi } from "@/redux/baseApi";
import type { ILoginInfo, ILoginResponseData, IRegisterInfo, IRegisterResponseData, IResponse, ISendOTP, IVerifyOTP } from "@/types";
import type { IUpdateUserInfo } from "@/types/auth.type";

export const authApi = baseApi.injectEndpoints({
    endpoints(build) {
        return {
            register: build.mutation<IResponse<IRegisterResponseData>, IRegisterInfo>({
                query: (userInfo) => ({
                    url: "/user/register",
                    method: "POST",
                    data: userInfo
                })
            }),
            login: build.mutation<IResponse<ILoginResponseData>, ILoginInfo>({
                query: (userInfo) => ({
                    url: "/auth/login",
                    method: "POST",
                    data: userInfo
                }),
                invalidatesTags: ["USER"]
            }),
            logout: build.mutation<IResponse<null>, void>({
                query: () => ({
                    url: "/auth/logout",
                    method: "POST",
                })
            }),
            sendOTP: build.mutation<IResponse<null>, ISendOTP>({
                query: (userInfo) => ({
                    url: "/otp/send",
                    method: "POST",
                    data: userInfo
                })
            }),
            verifyOTP: build.mutation<IResponse<null>, IVerifyOTP>({
                query: (userInfo) => ({
                    url: "/otp/verify",
                    method: "POST",
                    data: userInfo
                })
            }),
            user: build.query<IResponse<IRegisterResponseData>, void>({
                query: () => ({
                    url: "/user/me",
                    method: "GET"
                }),
                providesTags: ["USER"]
            }),
            updateUser: build.mutation<IResponse<IRegisterResponseData>, IUpdateUserInfo>({
                query: (userInfo) => ({
                    url: `/user/${userInfo._id}`,
                    method: "PATCH",
                    data: userInfo
                }),
                invalidatesTags: ["USER"]
            }),
        }
    },
})

export const {
    useRegisterMutation,
    useLoginMutation,
    useSendOTPMutation,
    useVerifyOTPMutation,
    useUserQuery,
    useLogoutMutation,
    useUpdateUserMutation
} = authApi;