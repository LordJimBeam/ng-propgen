import {ModelProperty} from './model.property';

export class ForeignManyModelProperty extends ModelProperty<Array<number>> {
  public service: any;
  public type: any;
  public defaultValue: Array<number> = [];
  public constructor(init?: Partial<ForeignManyModelProperty>) {
    super();
    Object.assign(this, init);
  }

}
