import {Component, EventEmitter, Injector, Input, Output} from '@angular/core';
import {ModelPropertyComponent} from './model.form.component';
import {ModelProperty} from '../model.property';
import {BackendService} from '../../services/backend.service';
import {SortableEntity} from '../../model/SortableEntity';
import {ForeignManyModelProperty} from '../foreign-many.model.property';

@Component({
  selector: 'propgen-foreign-key-form-input',
  template: '<mat-form-field hintLabel="{{helpText}}">\n' +
  '  <mat-select [(ngModel)]="data" placeholder="{{placeholder}}" multiple>' +
  '    <mat-option *ngFor="let e of entityList" [value]="e.id">{{ e.title }}</mat-option>' +
  '  </mat-select>\n' +
  '</mat-form-field>'
})
export class ForeignManyFormComponent implements ModelPropertyComponent {
  constructor(private injector: Injector) {}
  private _data: Array<number>;
  get data(): Array<number> {
    return this._data;
  };
  @Input() set data(d: Array<number>) {
    if(d !== this._data) {
      this._data = d;
      this.dataChange.emit(d);
    }
  }
  @Output() dataChange = new EventEmitter<Array<number>>();
  private placeholder: string;
  private helpText: string;
  private _propertyDescription: ForeignManyModelProperty;
  @Input() set propertyDescription(desc: ForeignManyModelProperty) {
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
    const dataService = (<BackendService<any>>this.injector.get(desc.service));
    dataService.getAll().subscribe((data) => {
      this.entityList = data.map((x) => x.toListItem());
    });
  };
  public setPropertyDescription(desc: ModelProperty) {
    this.propertyDescription = (<ForeignManyModelProperty>desc);
  }

  public isValid(): boolean {
    return this._propertyDescription.isValid(this._data);
  }

  protected entityList: SortableEntity[];


}
