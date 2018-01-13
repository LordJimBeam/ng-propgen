export class RESTListResponse<T> {
  constructor(
    public modelname: string,
    public object_list: T[]
  ) {}
}
