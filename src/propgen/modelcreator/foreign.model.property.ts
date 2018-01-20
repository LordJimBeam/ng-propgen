import {ModelProperty} from './model.property';

export class ForeignKeyModelProperty extends ModelProperty<number> {
  public service: any;
  public type: any;
  public constructor(init?: Partial<ForeignKeyModelProperty>) {
    super();
    Object.assign(this, init);
  }

}
