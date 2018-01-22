import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ModelFormComponent} from './base/model.form.component';
import {ModelProperty} from '../base/model.property';
import {hasOwnProperty} from 'tslint/lib/utils';

@Component({
  selector: 'propgen-number-form-input',
  template: '<mat-form-field hintLabel="{{helpText}}">\n' +
  '  <input matInput [step]="step" type="number" [formControl]="formControl" placeholder="{{placeholder}}"/>\n' +
  '  <mat-error *ngIf="formControl.invalid && (formControl.dirty && formControl.touched)">{{errorText}}</mat-error>' +
  '</mat-form-field>'
})
export class NumberFormComponent extends ModelFormComponent {
  constructor() {
    super();
    this.formControl.valueChanges.subscribe((value) => {
      this.data = value;
    });
  }
  private _data: number;
  get data(): number {
    return this._data;
  };
  @Input() set data(d: number) {
    if(d !== this._data) {
      this._data = d;
      this.dataChange.emit(d);
      this.formControl.setValue(d);
    }
  }
  @Output() dataChange = new EventEmitter<number>();
  private _propertyDescription: ModelProperty;
  @Input() set propertyDescription(desc: ModelProperty) {
    this._propertyDescription = desc;
    this.updatePlaceholder(desc);
    this.updateHelpText(desc);
    if(hasOwnProperty(desc, 'decimalPlaces') && desc['decimalPlaces'] > 0) {
      this.step = Math.pow(10, -desc['decimalPlaces']);
    }
    this.formControl.setValidators(desc.getValidators());
  };
  public setPropertyDescription(desc: ModelProperty) {
    this.propertyDescription = desc;
  }
  public step: number = 1;
  protected getErrorText(): string {
    if('min' in this.formControl.errors) {
      return 'Value must be greater or equal than ' + this.formControl.errors.min.min;
    }
    if('max' in this.formControl.errors) {
      return 'Value must be less or equal than ' + this.formControl.errors.max.max;
    }
  }
}
