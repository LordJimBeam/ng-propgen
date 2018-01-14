import {ModelProperty} from './model.property';

export class NumberModelProperty extends ModelProperty<number> {
  public component: any;
  public maxDigits: number;
  public decimalPlaces: number;
  public constructor(init?: Partial<NumberModelProperty>) {
    super();
    Object.assign(this, init);
  }

  public isValid(value: number) {
    if(this.maxDigits > 0 && value >= Math.pow(10, this.maxDigits + 1)) {
      return false;
    }
    // TODO maybe factor decimal places into validity as well
    return true;
  }
}
