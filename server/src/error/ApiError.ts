export default class ApiError {
    code: number;
    message: string;

    constructor(code: number, message: string) {
        this.code = code;
        this.message = message;
    }

    static badRequest(msg: string): ApiError {
        return new ApiError(400, msg);
    }

    static internal(msg: string): ApiError {
        return new ApiError(500, msg);
    }
}


