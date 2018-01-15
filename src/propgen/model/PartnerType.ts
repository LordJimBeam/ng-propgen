import {StringModelProperty} from '../modelcreator/string.model.property';
import {ModelProperty} from '../modelcreator/model.property';
import {SortableEntity} from './SortableEntity';
import {AutogeneratableModel} from './AutogeneratableModel';

export class PartnerType extends AutogeneratableModel {
  protected static _properties: ModelProperty[] = [
    new StringModelProperty({
      name: 'shortname',
      maxLength: 20,
      helpText: "Short form of partner types",
      defaultValue: ''
    }),
    new StringModelProperty({
      name: 'description',
      maxLength: 128,
      defaultValue: ''
    })
  ];
  public getProperties(): ModelProperty[] {
    return PartnerType._properties;
  }
  public toListItem(): SortableEntity {
    return new SortableEntity(this.id, this['shortname']);
  }
}
