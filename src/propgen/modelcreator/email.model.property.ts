import {ModelProperty} from './model.property';
import {Validators} from '@angular/forms';

export class EmailModelProperty extends ModelProperty<string> {
  public constructor(init?: Partial<EmailModelProperty>) {
    super();
    Object.assign(this, init);
  }

  public getValidators() {
    let base = super.getValidators();
    base.push(Validators.email);
    return base;
  }
}
