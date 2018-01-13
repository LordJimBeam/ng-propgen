export class RESTSingleResponse<T> {
  constructor(
    public modelname: string,
    public sm: T
  ) {}
}
