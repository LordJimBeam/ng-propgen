import {Type} from '@angular/core';
import {ModelProperty} from './model.property';

export type ModelPropertyType = {
  type: Type<ModelProperty>;
  name?: string;
  verboseName?: string;
  helpText?: string;
  required?: boolean;
  defaultValue?: any;
  component?: any;
  typeSpecificData?: Object;
}
