import {RESTModelInterface} from './RESTModelInterface';
import {StringModelProperty} from '../modelcreator/string.model.property';
import {ModelProperty} from '../modelcreator/model.property';
import {SortableEntity} from './SortableEntity';

export class PartnerType implements RESTModelInterface<PartnerType> {
  public id: number;
  public shortname: string;
  public description: string;
  private static _properties: ModelProperty[] = [
    new StringModelProperty({
      name: 'shortname',
      maxLength: 20,
      helpText: "Short form if partner types",
      defaultValue: ''
    }),
    new StringModelProperty({
      name: 'description',
      maxLength: 128,
      defaultValue: ''
    })
  ];
  public get properties(): ModelProperty[] {
    return PartnerType._properties;
  }

  public constructor(init?: Partial<PartnerType>) {
    Object.assign(this, init);
  }

  public toListItem(): SortableEntity {
    return new SortableEntity(this.id, this.shortname);
  }
}
