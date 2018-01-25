import {RESTModelInterface} from './RESTModelInterface';
import {ModelProperty} from '../modelcreator/base/model.property';
import {SortableEntity} from './SortableEntity';
import {Injector} from '@angular/core';

export abstract class AutogeneratableModel implements RESTModelInterface {
  public id: number = 0;
  public abstract getProperties(): ModelProperty[];
  public toListItem(injector: Injector): Promise<SortableEntity> {
    return new Promise<SortableEntity>((resolve) =>  {
      resolve(new SortableEntity(this.id, this[this.getProperties()[0].name]));
    });
  };
  public get verboseName(): string {
    return null;
  }
  public get helpText(): string {
    return null;
  }

  public constructor(data: Object = {}) {
    if('id' in data) {
      this.id = data['id'];
    }
    for(let prop of this.getProperties()) {
      if(prop.name in data) {
        this[prop.name] = data[prop.name];
      }
      else if(prop.defaultValue) {
        this[prop.name] = prop.defaultValue;
      }
    }
  }
}
