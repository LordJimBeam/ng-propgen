import {EventEmitter} from '@angular/core';
import {ModelProperty} from '../model.property';

export interface ModelPropertyComponent {
  data: any;
  dataChange: EventEmitter<any>;
  setPropertyDescription(desc: ModelProperty);
}
