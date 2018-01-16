import {Component, EventEmitter, Input, Output} from '@angular/core';
import {StringModelProperty} from '../string.model.property';
import {ModelPropertyComponent} from './model.form.component';
import {ModelProperty} from '../model.property';

@Component({
  selector: 'propgen-string-form-input',
  template: '<mat-form-field hintLabel="{{helpText}}">\n' +
  '  <input matInput [(ngModel)]="data" placeholder="{{placeholder}}"/>\n' +
  '</mat-form-field>'
})
export class StringFormComponent extends ModelPropertyComponent {
  private _data: string;
  get data(): string {
    return this._data;
  };
  @Input() set data(d: string) {
    if(d !== this._data) {
      this._data = d;
      this.dataChange.emit(d);
    }
  }
  @Output() dataChange = new EventEmitter<string>();
  private _propertyDescription: StringModelProperty;
  @Input() set propertyDescription(desc: StringModelProperty) {
    this._propertyDescription = desc;
    this.updatePlaceholder(desc);
    this.updateHelpText(desc);
  };
  public setPropertyDescription(desc: ModelProperty) {
    this.propertyDescription = (<StringModelProperty>desc);
  }

  public isValid(): boolean {
    return this._propertyDescription.isValid(this._data);
  }


}
