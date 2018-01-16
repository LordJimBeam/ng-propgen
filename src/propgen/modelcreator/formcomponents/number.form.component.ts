import {Component, EventEmitter, Input, Output} from '@angular/core';
import {StringModelProperty} from '../string.model.property';
import {ModelPropertyComponent} from './model.form.component';
import {ModelProperty} from '../model.property';
import {NumberModelProperty} from '../number.model.property';

@Component({
  selector: 'propgen-number-form-input',
  template: '<mat-form-field hintLabel="{{helpText}}">\n' +
  '  <input matInput type="number" step="step" [(ngModel)]="data" placeholder="{{placeholder}}"/>\n' +
  '</mat-form-field>'
})
export class NumberFormComponent extends ModelPropertyComponent {
  private _data: number;
  get data(): number {
    return this._data;
  };
  @Input() set data(d: number) {
    if(d !== this._data) {
      this._data = d;
      this.dataChange.emit(d);
    }
  }
  @Output() dataChange = new EventEmitter<number>();
  private _propertyDescription: NumberModelProperty;
  @Input() set propertyDescription(desc: NumberModelProperty) {
    this._propertyDescription = desc;
    this.updatePlaceholder(desc);
    this.updateHelpText(desc);
  };
  public setPropertyDescription(desc: ModelProperty) {
    this.propertyDescription = (<NumberModelProperty>desc);
  }

  public isValid(): boolean {
    return this._propertyDescription.isValid(this._data);
  }

  private step: number = 1;


}
