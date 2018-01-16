import {EventEmitter} from '@angular/core';
import {ModelProperty} from '../model.property';

export abstract class ModelPropertyComponent {
  public abstract data: any;
  public abstract dataChange: EventEmitter<any>;
  public abstract setPropertyDescription(desc: ModelProperty);
  protected placeholder: string;
  protected helpText: string;

  protected updatePlaceholder(desc: ModelProperty) {
    if(desc.verboseName) {
      this.placeholder = desc.verboseName;
    }
    else {
      this.placeholder = desc.name.charAt(0).toUpperCase() + desc.name.slice(1);
    }
  }
  protected updateHelpText(desc: ModelProperty) {
    if(desc.helpText) {
      this.helpText = desc.helpText;
    }
  }
}
