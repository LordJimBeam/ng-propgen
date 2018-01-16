import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ModelPropertyComponent} from './model.form.component';
import {ModelProperty} from '../model.property';
import {BooleanModelProperty} from '../boolean.model.property';

@Component({
  selector: 'propgen-boolean-form-input',
  template: '<mat-checkbox [(ngModel)]="data">{{placeholder}}</mat-checkbox>'
})
export class BooleanFormComponent extends ModelPropertyComponent {
  private _data: boolean;
  get data(): boolean {
    return this._data;
  };
  @Input() set data(d: boolean) {
    if(d !== this._data) {
      this._data = d;
      this.dataChange.emit(d);
    }
  }
  @Output() dataChange = new EventEmitter<boolean>();
  private _propertyDescription: BooleanModelProperty;
  @Input() set propertyDescription(desc: BooleanModelProperty) {
    this._propertyDescription = desc;
    this.updatePlaceholder(desc);
  };
  public setPropertyDescription(desc: ModelProperty) {
    this.propertyDescription = (<BooleanModelProperty>desc);
  }

  public isValid(): boolean {
    return this._propertyDescription.isValid(this._data);
  }

}
