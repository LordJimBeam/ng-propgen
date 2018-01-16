import {ModelProperty} from '../modelcreator/model.property';
import {StringModelProperty} from '../modelcreator/string.model.property';
import {MarkdownModelProperty} from '../modelcreator/markdown.model.property';
import {ForeignKeyModelProperty} from '../modelcreator/foreign.model.property';
import {Partner} from './Partner';
import {PartnerService} from '../services/partner.service';
import {SortableEntity} from './SortableEntity';
import {AutogeneratableModel} from './AutogeneratableModel';

export class Workpackage extends AutogeneratableModel {
  protected static _properties: ModelProperty[] = [
    new StringModelProperty({
      name: 'title',
      maxLength: 255
    }),
    new StringModelProperty({
      name: 'tag',
      maxLength: 20
    }),
    new MarkdownModelProperty({
      name: 'objectives'
    }),
    new MarkdownModelProperty({
      name: 'description'
    }),
    new StringModelProperty({
      name: 'type',
      verboseName: 'WP Type (RTD, MGMT, ...)',
      helpText: 'Type of the WP, according to predefined EU list',
      maxLength: 10,
      defaultValue: 'RTD'
    }),
    new ForeignKeyModelProperty({
      name: 'lead',
      type: Partner,
      service: PartnerService
    })
  ];
  public getProperties() {
    return Workpackage._properties;
  }
}
