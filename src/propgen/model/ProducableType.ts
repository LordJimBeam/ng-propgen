import {AutogeneratableModel} from './AutogeneratableModel';
import {ModelProperty} from '../modelcreator/model.property';
import {SortableEntity} from './SortableEntity';
import {StringModelProperty} from '../modelcreator/string.model.property';

export class ProducableType extends AutogeneratableModel {
  protected static _properties: ModelProperty[] = [
    new StringModelProperty({
      name: 'short',
      maxLength: 10
    }),
    new StringModelProperty({
      name: 'long',
      maxLength: 100
    }),
    new StringModelProperty({
      name: 'comments'
    })
  ];
  getProperties(): ModelProperty[] {
    return ProducableType._properties;
  }

  toListItem(): SortableEntity {
    return new SortableEntity(this.id, this['short']);
  }

}
