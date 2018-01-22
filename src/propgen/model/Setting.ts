import {AutogeneratableModel} from './AutogeneratableModel';
import {ModelProperty} from '../modelcreator/base/model.property';
import {StringModelProperty} from '../modelcreator/string.model.property';
import {TextModelProperty} from '../modelcreator/text.model.property';
import {SortableEntity} from './SortableEntity';

export class Setting extends AutogeneratableModel {
  protected static _properties: ModelProperty[] = [
    new StringModelProperty({
      name: 'group',
      verboseName: 'Settings group',
      maxLength: 64
    }),
    new StringModelProperty({
      name: 'name',
      verboseName: 'Settings name',
      maxLength: 128
    }),
    new StringModelProperty({
      name: 'value',
      verboseName: 'Settings value',
      maxLength: 256
    }),
    new TextModelProperty({
      name: 'description',
      verboseName: 'Description of this setting',
      helpText: 'Explain what this setting does, where it is used.'
    })
  ];
  getProperties(): ModelProperty[] {
    return Setting._properties;
  }
  toListItem() {
    return new Promise<SortableEntity>((resolve) => {
      resolve(new SortableEntity(this.id, this['group'] + '.' + this['name'] + ' = ' + this['value']));
    });
  }

}
