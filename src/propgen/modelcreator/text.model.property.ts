import {ModelProperty} from './model.property';

export class TextModelProperty extends ModelProperty<string> {
  public constructor(init?: Partial<TextModelProperty>) {
    super();
    Object.assign(this, init);
  }

}
