import {AutogeneratableModel} from './AutogeneratableModel';
import {ModelProperty} from '../modelcreator/base/model.property';
import {StringModelProperty} from '../modelcreator/string.model.property';
import {TextModelProperty} from '../modelcreator/text.model.property';
import {BooleanModelProperty} from '../modelcreator/boolean.model.property';
import {SortableEntity} from './SortableEntity';

export class Template extends AutogeneratableModel {
  protected static _properties: ModelProperty[] = [
    new StringModelProperty({
      name: 'name',
      verboseName: 'Name of the produced file',
      maxLength: 64
    }),
    new TextModelProperty({
      name: 'description',
      verboseName: 'Description',
      helpText: 'Provide a brief description of what this template does'
    }),
    new TextModelProperty({
      name: 'template',
      verboseName: 'Actual template text',
      helpText: 'Use Jinja2-style templates'
    }),
    new BooleanModelProperty({
      name: 'startpoint',
      verboseName: 'Start point',
      helpText: 'Should this template be offered as a possible starting point from which to produce PDFs?'
    })
  ];
  getProperties(): ModelProperty[] {
    return Template._properties;
  }
  toListItem() {
    return new Promise<SortableEntity>((resolve) => {
      let title = this['name'];
      if(this['description']) {
        title += ' (' + this['description'].substring(0, 50) + ')';
      }
      resolve(new SortableEntity(this.id, title));
    });
  }

}
