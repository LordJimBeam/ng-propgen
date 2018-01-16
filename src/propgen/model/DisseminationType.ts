import {AutogeneratableModel} from './AutogeneratableModel';
import {ModelProperty} from '../modelcreator/model.property';
import {SortableEntity} from './SortableEntity';
import {StringModelProperty} from '../modelcreator/string.model.property';
import {TextModelProperty} from '../modelcreator/text.model.property';

export class DisseminationType extends AutogeneratableModel {
  protected static _properties: ModelProperty[] = [
    new StringModelProperty({
      name: 'short',
      maxLength: 10
    }),
    new StringModelProperty({
      name: 'long',
      maxLength: 200
    }),
    new TextModelProperty({
      name: 'comments'
    })
  ];
  getProperties(): ModelProperty[] {
    return DisseminationType._properties;
  }

  toListItem(): SortableEntity {
    return new SortableEntity(this.id, this['short']);
  }

}
