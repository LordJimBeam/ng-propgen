import {ModelProperty} from '../modelcreator/model.property';
import {StringModelProperty} from '../modelcreator/string.model.property';
import {NumberModelProperty} from '../modelcreator/number.model.property';
import {ForeignKeyModelProperty} from '../modelcreator/foreign.model.property';
import {Workpackage} from './Workpackage';
import {WorkpackageService} from '../services/workpackage.service';
import {PartnerService} from '../services/partner.service';
import {Partner} from './Partner';
import {MarkdownModelProperty} from '../modelcreator/markdown.model.property';
import {AutogeneratableOrderableModel} from './AutogeneratableOrderableModel';

export class Task extends AutogeneratableOrderableModel {
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
    new NumberModelProperty({
      name: 'start',
      minValue: 0
    }),
    new NumberModelProperty({
      name: 'end',
      minValue: 0
    }),
    new ForeignKeyModelProperty({
      name: 'wp',
      type: Workpackage,
      service: WorkpackageService
    }),
    new ForeignKeyModelProperty({
      name: 'lead',
      type: Partner,
      service: PartnerService
    })
  ];
  getProperties(): ModelProperty[] {
    return Task._properties;
  }
}
