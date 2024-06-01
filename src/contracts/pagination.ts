export interface Pagination<T> {
    page: number;
    limit: number;
    total: number;
    hasNext: boolean;
    hasPrev: boolean;
    data: T[];
}

export interface PaginationOptions {
    page: number;
    limit: number;
}