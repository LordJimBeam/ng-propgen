import {ModelProperty} from '../modelcreator/model.property';
import {StringModelProperty} from '../modelcreator/string.model.property';
import {MarkdownModelProperty} from '../modelcreator/markdown.model.property';
import {NumberModelProperty} from '../modelcreator/number.model.property';
import {ForeignKeyModelProperty} from '../modelcreator/foreign.model.property';
import {PartnerService} from '../services/partner.service';
import {TaskService} from '../services/task.service';
import {ForeignManyModelProperty} from '../modelcreator/foreign-many.model.property';
import {WorkpackageService} from '../services/workpackage.service';
import {Partner} from './Partner';
import {Task} from './Task';
import {Workpackage} from './Workpackage';
import {AutogeneratableOrderableModel} from './AutogeneratableOrderableModel';

export class Milestone extends AutogeneratableOrderableModel {
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
      name: 'description'
    }),
    new NumberModelProperty({
      name: 'due',
      minValue: 0
    }),
    new ForeignKeyModelProperty({
      name: 'lead',
      type: Partner,
      service: PartnerService
    }),
    new ForeignKeyModelProperty({
      name: 'maintask',
      type: Task,
      service: TaskService
    }),
    new ForeignManyModelProperty({
      name: 'secondarytasks',
      type: Task,
      service: TaskService
    }),
    new MarkdownModelProperty({
      name: 'verification'
    }),
    new ForeignKeyModelProperty({
      name: 'wp',
      type: Workpackage,
      service: WorkpackageService
    })
  ];
  getProperties(): ModelProperty[] {
    return Milestone._properties;
  }
}
