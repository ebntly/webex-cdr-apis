export interface ItemsResponse<T> {
  items: T[];
}

export interface ItemsResponseWithMissingIds<T> extends ItemsResponse<T> {
  notFoundIds: string[] | null;
}