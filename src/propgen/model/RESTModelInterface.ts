import {ModelProperty} from '../modelcreator/model.property';
import {SortableEntity} from './SortableEntity';

export interface RESTModelInterface<T = {}> {
  id: number;
  properties: ModelProperty[];
  toListItem(): SortableEntity;
}
