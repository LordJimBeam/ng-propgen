import {ModelProperty} from './model.property';

export class EmailModelProperty extends ModelProperty<string> {
  public constructor(init?: Partial<EmailModelProperty>) {
    super();
    Object.assign(this, init);
  }

  isValid(value: string): boolean {
    return true;
  }

}
