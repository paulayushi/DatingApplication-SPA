export interface PagingHeader {
    currentPage: number;
    pageSize: number;
    totalPages: number;
    totalCount: number;
}

export class PaginatedResult<T> {
    result: T;
    pagingHeader: PagingHeader;
}