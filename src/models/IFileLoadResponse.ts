export interface IFileLoadResponse {
    fileBuffer: {
        data: BigInt64Array,
        type: string
    },
    isSent: boolean
}