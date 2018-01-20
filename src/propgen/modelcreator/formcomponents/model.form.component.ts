import {EventEmitter} from '@angular/core';
import {ModelProperty} from '../model.property';
import {FormControl} from '@angular/forms';

export abstract class ModelFormComponent {
  public abstract data: any;
  public abstract dataChange: EventEmitter<any>;
  public abstract setPropertyDescription(desc: ModelProperty);
  protected placeholder: string;
  protected helpText: string;
  protected _formControl: FormControl = new FormControl();

  public get formControl(): FormControl {
    return this._formControl;
  }

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
  protected get errorText(): string {
    console.log('Getting error text of ' + this.placeholder);
    if(this._formControl.errors && this._formControl.errors.required) {
      return 'This property is required';
    }
    let text = this.getErrorText();
    if(!text) {
      console.log(this._formControl.errors);
      text = 'Encountered an unknown validation error';
    }
    return text;
  }
  protected getErrorText() {
    return null;
  }
}
