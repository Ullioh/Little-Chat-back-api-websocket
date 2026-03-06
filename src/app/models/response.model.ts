export class ResponseModel {
    data: any;
    message?: string;
    statusCode?: number;
    success: boolean = true;
    error?: string;
    token?: string;

    constructor(data: any, message?: string, statusCode?: number, success?:boolean, error?: string, token?: string) {
        this.data = data;
        this.message = message;
        this.statusCode = statusCode;
        this.error = error;
        this.success = !error;
        if (success !== undefined) {
            this.success = success;
        }
        this.token = token;
    }
}

export class ResponsePaginationModel {
    rows: any[];
    totalCount: number;
    page: number;
    limit: number;
    sortBy: string;
    sortOrder: string;
    search: string;
}