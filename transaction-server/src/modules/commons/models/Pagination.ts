export default class Pagination {
  public page?: number;
  public limit?: number;
  public total?: number;
  public nextPageToken?: string;

  public calcNextPageToken(): void {
      if (this.total > this.limit) {
          if (this.total > (Number(this.page) * this.limit)) {
              this.nextPageToken = (Number(this.page) + 1).toString();
          }
      }
  }
}
