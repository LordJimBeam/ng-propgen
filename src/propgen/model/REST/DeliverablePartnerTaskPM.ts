import {Injector} from '@angular/core';
import {SortableEntity} from '../SortableEntity';
import {RESTModelInterface} from '../RESTModelInterface';

export class DeliverablePartnerTaskPM implements RESTModelInterface {
  public id: number;

  private _title: string;
  toListItem(injector: Injector) {
    return new Promise<SortableEntity>((resolve) => {
      resolve(new SortableEntity(this.id, this['effort']));
    });
  }

}
