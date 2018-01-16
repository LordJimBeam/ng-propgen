import {AutogeneratableModel} from './AutogeneratableModel';
import {ModelProperty} from '../modelcreator/model.property';
import {NumberModelProperty} from '../modelcreator/number.model.property';
import {ForeignKeyModelProperty} from '../modelcreator/foreign.model.property';
import {PartnerService} from '../services/partner.service';
import {DeliverableService} from '../services/deliverable.service';
import {TaskService} from '../services/task.service';
import {Injector} from '@angular/core';
import {SortableEntity} from './SortableEntity';
import {BackendService} from '../services/backend.service';
import {Partner} from './Partner';
import {Deliverable} from './Deliverable';
import {Task} from './Task';

export class DeliverablePartnerTaskPM extends AutogeneratableModel {
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
      name: 'deliverable',
      type: Deliverable,
      service: DeliverableService
    }),
    new ForeignKeyModelProperty({
      name: 'task',
      type: Task,
      service: TaskService
    })
  ];
  public static verboseName = 'PM per partner, per task, per deliverable';
  getProperties(): ModelProperty[] {
    return DeliverablePartnerTaskPM._properties;
  }
  private _title: string;
  toListItem(injector: Injector) {
    return new Promise<SortableEntity>((resolve) => {
      if(this._title) {
        resolve(new SortableEntity(this.id, this._title));
        return;
      }
      const partnerPromise = injector.get(PartnerService).get(this['partner']);
      const deliverablePromise = injector.get(DeliverableService).get(this['deliverable']);
      const taskPromise = injector.get(TaskService).get(this['task']);
      Promise.all([partnerPromise, deliverablePromise, taskPromise]).then((data) => {
        Promise.all([
          data[0].toListItem(injector),
          data[1].toListItem(injector),
          data[2].toListItem(injector)
        ]).then((items) => {
          this._title = items[0].title + ' @ del. ' + items[1].title + ' for task ' + items[2].title + ': ' + this['effort'];
          resolve(new SortableEntity(this.id, this._title));
        }).catch((error) => {
          console.error(error);
          resolve(new SortableEntity(this.id, this['effort']));
        });
      }).catch((error) => {
        console.error(error);
        resolve(new SortableEntity(this.id, this['effort']));
      });
    });
  }

}
