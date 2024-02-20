export interface IPaginatedQuery {
  timeZone?: string;
  pageNo: number;
  pageSize: number;
  sortBy?: string;
  sortDirection?: string;
  startTime?: Date;
  endTime?: Date;
}
