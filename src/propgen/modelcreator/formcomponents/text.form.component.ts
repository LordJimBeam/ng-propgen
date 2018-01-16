import {Component, EventEmitter, Input, Output} from '@angular/core';
import {StringModelProperty} from '../string.model.property';
import {ModelPropertyComponent} from './model.form.component';
import {ModelProperty} from '../model.property';

@Component({
  selector: 'propgen-text-form-input',
  template: '<mat-form-field hintLabel="{{helpText}}">\n' +
  '  <textarea matInput [(ngModel)]="data" placeholder="{{placeholder}}"></textarea>\n' +
  '</mat-form-field>'
})
export class TextFormComponent implements ModelPropertyComponent {
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
  private placeholder: string;
  private helpText: string;
  private _propertyDescription: StringModelProperty;
  @Input() set propertyDescription(desc: StringModelProperty) {
    this._propertyDescription = desc;
    if(desc.verboseName) {
      this.placeholder = desc.verboseName;
    }
    else {
      this.placeholder = desc.name.charAt(0).toUpperCase() + desc.name.slice(1);
    }
    if(desc.helpText) {
      this.helpText = desc.helpText;
    }
  };
  public setPropertyDescription(desc: ModelProperty) {
    this.propertyDescription = (<StringModelProperty>desc);
  }

  public isValid(): boolean {
    return this._propertyDescription.isValid(this._data);
  }


}