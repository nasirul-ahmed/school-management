export interface IPaginatedResponse<T> {
    data: T[];
    totalItems?: number;
    limit: number;
    page: number;
    totalPages?: number;
    morePages?: boolean;
  }
  