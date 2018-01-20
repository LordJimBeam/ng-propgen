import {Component, EventEmitter, Input, Output} from '@angular/core';
import {StringModelProperty} from '../string.model.property';
import {ModelFormComponent} from './model.form.component';
import {ModelProperty} from '../model.property';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'propgen-string-form-input',
  template: '<mat-form-field hintLabel="{{helpText}}">\n' +
  '  <input matInput [formControl]="formControl" placeholder="{{placeholder}}"/>\n' +
  '  <mat-error *ngIf="formControl.invalid && (formControl.dirty && formControl.touched)">{{errorText}}</mat-error>' +
  '</mat-form-field>'
})
export class StringFormComponent extends ModelFormComponent {
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
  private _propertyDescription: StringModelProperty;
  @Input() set propertyDescription(desc: StringModelProperty) {
    this._propertyDescription = desc;
    this.updatePlaceholder(desc);
    this.updateHelpText(desc);
    this.formControl.setValidators(desc.getValidators());
  };
  public setPropertyDescription(desc: ModelProperty) {
    this.propertyDescription = (<StringModelProperty>desc);
  }
  protected getErrorText(): string {
    if('minlength' in this.formControl.errors) {
      return 'Must be at least ' + this.formControl.errors.minlength.requiredLength + ' characters';
    }
    if('maxlength' in this.formControl.errors) {
      return 'May not be longer than ' + this.formControl.errors.maxlength.requiredLength + ' characters';
    }
  }
}
