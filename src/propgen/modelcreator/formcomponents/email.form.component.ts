import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ModelFormComponent} from './model.form.component';
import {ModelProperty} from '../model.property';
import {EmailModelProperty} from '../email.model.property';

@Component({
  selector: 'propgen-email-form-input',
  template: '<mat-form-field hintLabel="{{helpText}}">\n' +
  '  <input type="email" matInput placeholder="{{placeholder}}" [formControl]="formControl"/>\n' +
  '  <mat-error *ngIf="formControl.invalid && (formControl.dirty && formControl.touched)">{{errorText}}</mat-error>' +
  '</mat-form-field>'
})
export class EmailFormComponent extends ModelFormComponent {
  constructor() {
    super();
    this.formControl.valueChanges.subscribe((value) => {
      this.data = value;
    });
  }
  private _data: string;
  get data(): string {
    return this._data;
  };
  @Input() set data(d: string) {
    if(d !== this._data) {
      this._data = d;
      this.dataChange.emit(d);
      this.formControl.setValue(d);
    }
  }
  @Output() dataChange = new EventEmitter<string>();
  private _propertyDescription: EmailModelProperty;
  @Input() set propertyDescription(desc: EmailModelProperty) {
    this._propertyDescription = desc;
    this.updatePlaceholder(desc);
    this.updateHelpText(desc);
    this.formControl.setValidators(desc.getValidators());
  };
  public setPropertyDescription(desc: ModelProperty) {
    this.propertyDescription = (<EmailModelProperty>desc);
  }
  protected getErrorText(): string {
    if('email' in this._formControl.errors) {
      return 'Please enter a valid email address';
    }
  }

}
