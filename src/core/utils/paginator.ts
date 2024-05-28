export abstract class Paginator {
  static getMetadata(total: number = 0, limit: number, page: number) {
    const lastPage = Math.ceil(total / limit);
    const hasNextPage = page < lastPage;
    const hasPreviousPage = page > 1 && page <= lastPage + 1;
    return { total, limit, page, hasNextPage, hasPreviousPage };
  }
}
