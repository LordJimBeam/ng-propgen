import {StringModelProperty} from './string.model.property';
import {ModelProperty} from './model.property';

export class MarkdownModelProperty extends ModelProperty<string> {
  public constructor(init?: Partial<StringModelProperty>) {
    super();
    Object.assign(this, init);
  }

  public isValid(value: string): boolean {
    return true;
  }
}
