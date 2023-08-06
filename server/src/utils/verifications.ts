import errors from "./errors.js";

export async function verifyIfIsNumber(args:Object) {
    for (const [name, value] of Object.entries(args)) {
        if (Number.isNaN(value)) {
            throw errors.INVALID_PARAMETER(`Argument ${name} must be a number`);
        }
    }
}