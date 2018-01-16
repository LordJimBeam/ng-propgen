import {ModelProperty} from './model.property';

export class TextModelProperty extends ModelProperty<string> {
  component: any;
  public constructor(init?: Partial<TextModelProperty>) {
    super();
    Object.assign(this, init);
  }

  isValid(value: string): boolean {
    return true;
  }

}
