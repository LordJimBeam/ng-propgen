import {ModelProperty} from '../modelcreator/base/model.property';
import {StringModelProperty} from '../modelcreator/string.model.property';
import {MarkdownModelProperty} from '../modelcreator/markdown.model.property';
import {SortableEntity} from './SortableEntity';
import {AutogeneratableOrderableModel} from './AutogeneratableOrderableModel';

export class Textblock extends AutogeneratableOrderableModel {
  protected static _properties: ModelProperty[] = [
    new StringModelProperty({
      name: 'name',
      verboseName: 'Short name of the textblock',
      helpText: 'This name is used to refer to the textblock in templates',
      maxLength: 64
    }),
    new StringModelProperty({
      name: 'description',
      verboseName: 'Brief description',
      helpText: 'Provide a brief description of this block; leave empty if clear; does not end up in output'
    }),
    new StringModelProperty({
      name: 'filename',
      verboseName: 'Filename for the content of the textblock',
      helpText: 'Provide a filename if you want the content of this textblock to be written to a markdown file. If empty, ' +
      'no file is produced automatically; content has to be used in a template explicitly, then.',
      maxLength: 64
    }),
    new MarkdownModelProperty({
      name: 'textblock',
      verboseName: 'Actual text',
      helpText: 'Actual text for this block, in Markdown format'
    })
  ];
  getProperties() {
    return Textblock._properties;
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
