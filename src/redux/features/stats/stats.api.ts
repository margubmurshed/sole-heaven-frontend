import { baseApi } from "@/redux/baseApi";
import type {IResponse,} from "@/types";
import type { IStats } from "@/types/stats.type";

export const statsApi = baseApi.injectEndpoints({
    endpoints(build) {
        return {
            getStats: build.query<IResponse<IStats>, void>({
                query: () => ({
                    url: "/stats",
                    method: "GET",
                }),
                providesTags: ["CATEGORY"]
            }),
        }
    },
})

export const {
    useGetStatsQuery
} = statsApi;