export interface ApiMultipleResponse<T> {
  success: boolean;
  limit: number;
  offset: number;
  total: number;
  rows: T[];
}
