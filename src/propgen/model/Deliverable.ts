import {AutogeneratableModel} from './AutogeneratableModel';
import {ModelProperty} from '../modelcreator/model.property';
import {StringModelProperty} from '../modelcreator/string.model.property';
import {MarkdownModelProperty} from '../modelcreator/markdown.model.property';
import {NumberModelProperty} from '../modelcreator/number.model.property';
import {ForeignKeyModelProperty} from '../modelcreator/foreign.model.property';
import {PartnerService} from '../services/partner.service';
import {TaskService} from '../services/task.service';
import {ProducabletypeService} from '../services/producabletype.service';
import {DisseminationtypeService} from '../services/disseminationtype.service';
import {WorkpackageService} from '../services/workpackage.service';
import {ForeignManyModelProperty} from '../modelcreator/foreign-many.model.property';
import {Partner} from './Partner';
import {Task} from './Task';
import {ProducableType} from './ProducableType';
import {DisseminationType} from './DisseminationType';
import {Workpackage} from './Workpackage';

export class Deliverable extends AutogeneratableModel {
  protected static _properties = [
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
    new ForeignKeyModelProperty({
      name: 'type',
      type: ProducableType,
      service: ProducabletypeService
    }),
    new ForeignKeyModelProperty({
      name: 'dissemination',
      type: DisseminationType,
      service: DisseminationtypeService
    }),
    new ForeignKeyModelProperty({
      name: 'wp',
      type: Workpackage,
      service: WorkpackageService
    })
  ];
  getProperties(): ModelProperty[] {
    return Deliverable._properties;
  }

}
