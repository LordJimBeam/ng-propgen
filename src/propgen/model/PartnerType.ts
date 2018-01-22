import {StringModelProperty} from '../modelcreator/string.model.property';
import {ModelProperty} from '../modelcreator/base/model.property';
import {SortableEntity} from './SortableEntity';
import {AutogeneratableOrderableModel} from './AutogeneratableOrderableModel';

export class PartnerType extends AutogeneratableOrderableModel {
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
  toListItem() {
    return new Promise<SortableEntity>((resolve) => {
      resolve(new SortableEntity(this.id, this['shortname'] + ' ' + this['description']));
    });
  }
}
