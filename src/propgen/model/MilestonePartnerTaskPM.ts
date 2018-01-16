import {AutogeneratableModel} from './AutogeneratableModel';
import {ModelProperty} from '../modelcreator/model.property';
import {NumberModelProperty} from '../modelcreator/number.model.property';
import {ForeignKeyModelProperty} from '../modelcreator/foreign.model.property';
import {Partner} from './Partner';
import {PartnerService} from '../services/partner.service';
import {Milestone} from './Milestone';
import {MilestoneService} from '../services/milestone.service';
import {Task} from './Task';
import {TaskService} from '../services/task.service';
import {Injector} from '@angular/core';
import {SortableEntity} from './SortableEntity';

export class MilestonePartnerTaskPM extends AutogeneratableModel {
  protected static _properties: ModelProperty[] = [
    new NumberModelProperty({
      name: 'effort',
      maxDigits: 6,
      decimalPlaces: 2
    }),
    new ForeignKeyModelProperty({
      name: 'partner',
      type: Partner,
      service: PartnerService
    }),
    new ForeignKeyModelProperty({
      name: 'milestone',
      type: Milestone,
      service: MilestoneService
    }),
    new ForeignKeyModelProperty({
      name: 'task',
      type: Task,
      service: TaskService
    })
  ];
  getProperties(): ModelProperty[] {
    return MilestonePartnerTaskPM._properties;
  }
  private _title: string;
  toListItem(injector: Injector) {
    return new Promise<SortableEntity>((resolve) => {
      if(this._title) {
        resolve(new SortableEntity(this.id, this._title));
        return;
      }
      const partnerPromise = injector.get(PartnerService).get(this['partner']);
      const milestonePromise = injector.get(MilestoneService).get(this['milestone']);
      const taskPromise = injector.get(TaskService).get(this['task']);
      Promise.all([partnerPromise, milestonePromise, taskPromise]).then((data) => {
        Promise.all([data[0].toListItem(injector), data[1].toListItem(injector), data[2].toListItem(injector)]).then((items) => {
          this._title = items[0].title + ' @MS ' + items[1].title + ' for task ' + items[2].title + ': ' + this['effort'];
          resolve(new SortableEntity(this.id, this._title));
        }).catch(error => {
          console.error(error);
          resolve(new SortableEntity(this.id, this['effort']));
        });
      }).catch(error => {
        console.error(error);
        resolve(new SortableEntity(this.id, this['effort']));
      });
    });
  }
}
