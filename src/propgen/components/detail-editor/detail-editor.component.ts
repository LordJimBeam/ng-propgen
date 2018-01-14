import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'propgen-detail-editor',
  templateUrl: './detail-editor.component.html'
})
export class DetailEditorComponent {
  @Input() title: string;
  @Input() enabled: boolean;
  @Output() onSave = new EventEmitter();
  @Output() onCancel = new EventEmitter();

  protected onSaveClick() {
    this.onSave.emit();
  }

  protected onCancelClick() {
    this.onCancel.emit();
  }
}
