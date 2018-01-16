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
export class ForeignManyFormComponent extends ModelPropertyComponent {
  constructor(private injector: Injector) {
    super();
  }
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
  private _propertyDescription: ForeignManyModelProperty;
  @Input() set propertyDescription(desc: ForeignManyModelProperty) {
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
