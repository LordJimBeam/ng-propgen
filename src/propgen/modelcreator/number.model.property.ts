import {ModelProperty} from './model.property';

export class NumberModelProperty extends ModelProperty<number> {
  public maxDigits: number;
  public decimalPlaces: number;
  public minValue: number = null;
  public maxValue: number = null;
  public constructor(init?: Partial<NumberModelProperty>) {
    super();
    Object.assign(this, init);
  }

  public isValid(value: number) {
    if(this.maxDigits > 0 && value >= Math.pow(10, this.maxDigits + 1)) {
      return false;
    }
    if(this.minValue !== null && this.minValue > value) {
      return false;
    }
    if(this.maxValue !== null && this.maxValue < value) {
      return false;
    }
    // TODO maybe factor decimal places into validity as well
    return true;
  }
}
