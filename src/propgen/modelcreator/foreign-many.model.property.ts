import {ModelProperty} from './model.property';
import {ForeignKeyModelProperty} from './foreign.model.property';

export class ForeignManyModelProperty extends ModelProperty<Array<number>> {
  component: any;
  service: any;

  isValid(value: Array<number>): boolean {
    return true;
  }
  public constructor(init?: Partial<ForeignManyModelProperty>) {
    super();
    Object.assign(this, init);
  }

}
