import {RESTModelInterface} from './RESTModelInterface';
import {ModelProperty} from '../modelcreator/model.property';
import {SortableEntity} from './SortableEntity';

export abstract class AutogeneratableModel implements RESTModelInterface {
  public id: number = 0;
  public abstract getProperties(): ModelProperty[];
  public toListItem(): SortableEntity {
    return new SortableEntity(this.id, this[this.getProperties()[0].name]);
  };

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
