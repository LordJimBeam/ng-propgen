import {ModelProperty} from './model.property';
import {StringFormComponent} from './formcomponents/string.form.component';

export class StringModelProperty extends ModelProperty<string> {
  public minLength: number;
  public maxLength: number;
  public component: any;
  public constructor(init?: Partial<StringModelProperty>) {
    super();
    Object.assign(this, init);
  }

  public isValid(value: string): boolean {
    if(value.length < this.minLength) {
      return false;
    }
    if(this.maxLength > 0 && value.length > this.maxLength) {
      return false;
    }
    return true;
  }

}
