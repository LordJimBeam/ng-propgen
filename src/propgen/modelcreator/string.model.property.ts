import {ModelProperty} from './model.property';
import {StringFormComponent} from './formcomponents/string.form.component';
import {Validators} from '@angular/forms';

export class StringModelProperty extends ModelProperty<string> {
  public minLength: number;
  public maxLength: number;
  public constructor(init?: Partial<StringModelProperty>) {
    super();
    Object.assign(this, init);
  }

  public getValidators() {
    let base = super.getValidators();
    if(this.minLength > 0) {
      base.push(Validators.minLength(this.minLength));
    }
    if(this.maxLength > 0) {
      base.push(Validators.maxLength(this.maxLength));
    }
    return base;
  }

}
