import { IFileLoadResponse } from "../models/IFileLoadResponse"
import { IFileToHtmlResponse } from '../models/IFileToHtmlResponse'
import { $host } from "."

export const loadFile = async (sheetName: string, templateName: string) => {
    const data = {
        sheetName,
        templateName
    }
    const {data: responseData} = await $host.post<IFileLoadResponse>('api/file/load', data)
    return responseData
}

export const fileToHtml = async (fileName: string) => {
    const data = {
        fileName
    }
    const {data: responseData} = await $host.post<IFileToHtmlResponse>('api/file/fileToHtml', data)
    return responseData
}