import { Request, Response } from "express"
import httpErrors from "./http-errors.js"

export default function handleRequestInit(sendResponse: Function, sendError: Function){
    return function(handler: Function) {
        return async function (req: Request, rsp: Response) {
            try {
                let obj = await handler(req, rsp)
                sendResponse(obj, rsp)
            } catch (error: any) {
                const errorHttp: {status:number; message:string} = httpErrors(error)
                sendError(errorHttp, rsp)
            }
        }
    }
}