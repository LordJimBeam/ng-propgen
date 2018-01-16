import {ModelProperty} from './model.property';

export class BooleanModelProperty extends ModelProperty<boolean> {
  public constructor(init?: Partial<BooleanModelProperty>) {
    super();
    Object.assign(this, init);
  }
  isValid(value: boolean): boolean {
    return true;
  }

}
