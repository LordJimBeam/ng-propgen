export abstract class ModelProperty<T = {}> {
  public name: string;
  public verboseName: string;
  public helpText: string;
  public defaultValue: T;
  public abstract isValid(value: T): boolean;
  public component: any;
}
