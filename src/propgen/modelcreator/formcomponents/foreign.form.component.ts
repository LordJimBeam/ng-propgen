import {Component, EventEmitter, Injector, Input, Output} from '@angular/core';
import {ModelFormComponent} from './base/model.form.component';
import {BackendService} from '../../services/backend.service';
import {SortableEntity} from '../../model/SortableEntity';
import {ForeignModelProperty} from '../base/foreign-model.property';
import {ModelProperty} from '../base/model.property';

@Component({
  selector: 'propgen-foreign-key-form-input',
  template: '<mat-form-field hintLabel="{{helpText}}">\n' +
  '  <mat-select [formControl]="formControl" placeholder="{{placeholder}}">' +
  '    <mat-option [value]="0">-</mat-option>' +
  '    <mat-option *ngFor="let e of entityList" [value]="e.id">{{ e.title }}</mat-option>' +
  '  </mat-select>\n' +
  '</mat-form-field>'
})
export class ForeignKeyFormComponent extends ModelFormComponent {
  constructor(private injector: Injector) {
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
  private _propertyDescription: ForeignModelProperty;
  @Input() set propertyDescription(desc: ForeignModelProperty) {
    this._propertyDescription = desc;
    const dataService = (<BackendService<any>>this.injector.get(desc.service));
    dataService.getAll().subscribe((data) => {
      Promise.all(data.map((d) => {
        return d.toListItem(this.injector);
      })).then((data) => {
        this.entityList = data;
      });
    });

    if(desc.verboseName) {
      this.placeholder = desc.verboseName;
    }
    else if(desc.type && desc.type.verboseName) {
      this.placeholder = desc.type.verboseName;
    }
    else {
      this.updatePlaceholder(desc);
    }
    if(desc.helpText) {
      this.helpText = desc.helpText;
    }
    else if(desc.type && desc.type.helpText) {
      this.helpText = desc.type.helpText;
    }
    else {
      this.updateHelpText(desc);
    }
    this.formControl.setValidators(desc.getValidators());
  };
  public setPropertyDescription(desc: ModelProperty) {
    this.propertyDescription = (<ForeignModelProperty>desc);
  }

  public entityList: SortableEntity[];


}
