import {Component, EventEmitter, Injector, Input, Output} from '@angular/core';
import {StringModelProperty} from '../string.model.property';
import {ModelPropertyComponent} from './model.form.component';
import {ModelProperty} from '../model.property';
import {NumberModelProperty} from '../number.model.property';
import {ForeignKeyModelProperty} from '../foreign.model.property';
import {BackendService} from '../../services/backend.service';
import {SortableEntity} from '../../model/SortableEntity';

@Component({
  selector: 'propgen-foreign-key-form-input',
  template: '<mat-form-field hintLabel="{{helpText}}">\n' +
  '  <mat-select [(ngModel)]="data" placeholder="{{placeholder}}">' +
  '    <mat-option [value]="0">-</mat-option>' +
  '    <mat-option *ngFor="let e of entityList" [value]="e.id">{{ e.title }}</mat-option>' +
  '  </mat-select>\n' +
  '</mat-form-field>'
})
export class ForeignKeyFormComponent extends ModelPropertyComponent {
  constructor(private injector: Injector) {
    super();
  }
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
  private _propertyDescription: ForeignKeyModelProperty;
  @Input() set propertyDescription(desc: ForeignKeyModelProperty) {
    this._propertyDescription = desc;
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
    const dataService = (<BackendService<any>>this.injector.get(desc.service));
    dataService.getAll().subscribe((data) => {
      Promise.all(data.map((d) => {
        return d.toListItem(this.injector);
      })).then((data) => {
        this.entityList = data;
      });
    });
  };
  public setPropertyDescription(desc: ModelProperty) {
    this.propertyDescription = (<ForeignKeyModelProperty>desc);
  }

  public isValid(): boolean {
    return this._propertyDescription.isValid(this._data);
  }

  protected entityList: SortableEntity[];


}
