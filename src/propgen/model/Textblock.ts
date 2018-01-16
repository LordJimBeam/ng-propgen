import {ModelProperty} from '../modelcreator/model.property';
import {StringModelProperty} from '../modelcreator/string.model.property';
import {MarkdownModelProperty} from '../modelcreator/markdown.model.property';
import {SortableEntity} from './SortableEntity';
import {AutogeneratableModel} from './AutogeneratableModel';

export class Textblock extends AutogeneratableModel {
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
  toListItem(): SortableEntity {
    return new SortableEntity(this.id, this['name']);
  }
}