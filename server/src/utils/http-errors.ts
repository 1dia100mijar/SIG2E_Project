import { ERROR_CODES } from "./errors.js";

function HttpErrorResponse(status: number, message: string){
    return {
        status: status,
        message: message
    }
}

const HTTP_STATUS_CODES = {
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500
}

export default function(error: { code: number; message: string }) {
    switch(error.code) {
        case ERROR_CODES.INVALID_PARAMETER_CODE:
            return HttpErrorResponse(HTTP_STATUS_CODES.BAD_REQUEST, error.message)
        case ERROR_CODES.NO_PERMISSION_CODE:
            return HttpErrorResponse(HTTP_STATUS_CODES.UNAUTHORIZED, error.message)
        case ERROR_CODES.NOT_FOUND_CODE:
            return HttpErrorResponse(HTTP_STATUS_CODES.NOT_FOUND, error.message)
        default: 
            return HttpErrorResponse(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, 'Internal Server Error')
    }
}