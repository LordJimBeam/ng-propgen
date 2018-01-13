import {Component, EventEmitter, Input, Output} from '@angular/core';
import {SortableEntity} from '../../model/SortableEntity';

@Component({
  selector: 'propgen-sortable-list',
  templateUrl: './sortable-list.component.html'
})
export class SortableListComponent {
  @Input() title: string;
  @Input() entities: SortableEntity[];
  @Output() onCreateEntity = new EventEmitter();
  @Output() onEditEntity = new EventEmitter<SortableEntity>();
  @Output() onReorder = new EventEmitter<SortableEntity[]>();

  protected sortableOptions = {
    // see https://github.com/RubaXa/Sortable#options
    handle: '.sort-handle',
    onUpdate: ($event) => this.onDropSuccessful($event)
  };

  protected onAddButtonClick() {
    this.onCreateEntity.emit();
  }

  protected onEditButtonClick(entity: SortableEntity) {
    this.onEditEntity.emit(entity);
  }

  protected onDropSuccessful($event) {
    this.onReorder.emit(this.entities);
  }

}
