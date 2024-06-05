import { ILinkResponse } from "../models/ILinkResponse"
import { $host } from "./index."

export const linkToFile = async (link: URL, ext: string) => {
    const data = {
        link,
        ext
    }
    const {data: responseData} = await $host.post<ILinkResponse>('api/link/linkToFile', data)
    return responseData
}