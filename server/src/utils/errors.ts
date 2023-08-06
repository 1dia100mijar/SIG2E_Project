export const ERROR_CODES = {
    INVALID_PARAMETER_CODE: 1,
    NO_PERMISSION_CODE: 2,
    NOT_FOUND_CODE: 3,
}

export default {
    INVALID_PARAMETER: (message: string) => {
        return {
            code: ERROR_CODES.INVALID_PARAMETER_CODE,
            message: message
        }
    },
    NO_PERMISSION: (message: string) => {
        return {
            code: ERROR_CODES.NO_PERMISSION_CODE,
            message: message
        }
    },
    NOT_FOUND: (message: string) => {
        return {
            code: ERROR_CODES.NOT_FOUND_CODE,
            message: message
        }
    }
}