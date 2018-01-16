import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ModelPropertyComponent} from './model.form.component';
import {ModelProperty} from '../model.property';
import {EmailModelProperty} from '../email.model.property';

@Component({
  selector: 'propgen-email-form-input',
  template: '<mat-form-field hintLabel="{{helpText}}">\n' +
  '  <input type="email" matInput [(ngModel)]="data" placeholder="{{placeholder}}"/>\n' +
  '</mat-form-field>'
})
export class EmailFormComponent extends ModelPropertyComponent {
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
  private _propertyDescription: EmailModelProperty;
  @Input() set propertyDescription(desc: EmailModelProperty) {
    this._propertyDescription = desc;
    this.updatePlaceholder(desc);
    this.updateHelpText(desc);
  };
  public setPropertyDescription(desc: ModelProperty) {
    this.propertyDescription = (<EmailModelProperty>desc);
  }

  public isValid(): boolean {
    return this._propertyDescription.isValid(this._data);
  }


}
