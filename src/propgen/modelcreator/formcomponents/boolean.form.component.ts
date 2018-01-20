import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ModelFormComponent} from './model.form.component';
import {ModelProperty} from '../model.property';
import {BooleanModelProperty} from '../boolean.model.property';

@Component({
  selector: 'propgen-boolean-form-input',
  template: '<mat-checkbox [formControl]="formControl">{{placeholder}}</mat-checkbox>'
})
export class BooleanFormComponent extends ModelFormComponent {
  constructor() {
    super();
    this.formControl.valueChanges.subscribe((value) => {
      this.data = value;
    });
  }
  private _data: boolean;
  get data(): boolean {
    return this._data;
  };
  @Input() set data(d: boolean) {
    if(d !== this._data) {
      this._data = d;
      this.dataChange.emit(d);
      this.formControl.setValue(d);
    }
  }
  @Output() dataChange = new EventEmitter<boolean>();
  private _propertyDescription: BooleanModelProperty;
  @Input() set propertyDescription(desc: BooleanModelProperty) {
    this._propertyDescription = desc;
    this.updatePlaceholder(desc);
    this.formControl.setValidators(desc.getValidators());
  };
  public setPropertyDescription(desc: ModelProperty) {
    this.propertyDescription = (<BooleanModelProperty>desc);
  }

  public isValid(): boolean {
    return true;
  }

}
