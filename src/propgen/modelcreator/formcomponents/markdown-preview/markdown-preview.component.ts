import {Component, EventEmitter, Input, Output} from '@angular/core';
import {StringModelProperty} from '../../string.model.property';
import {ModelFormComponent} from '../model.form.component';
import {ModelProperty} from '../../model.property';
import {MarkdownModelProperty} from '../../markdown.model.property';

@Component({
  selector: 'propgen-markdown-preview',
  templateUrl: './markdown-preview.component.html',
  styleUrls: ['./markdown-preview.component.css']
})
export class MarkdownPreviewComponent extends ModelFormComponent {
  constructor() {
    super();
    this.formControl.valueChanges.subscribe((value) => {
      this.data = value;
    });
  }
  get data() {
    return this.text;
  }
  @Input() set data(text: string) {
    if(text !== this.text) {
      this.text = text;
      this.dataChange.emit(text);
      this.formControl.setValue(text);
    }
  }
  @Output() dataChange = new EventEmitter<string>();
  private text: string;
  private _propertyDescription: MarkdownModelProperty;
  @Input() set propertyDescription(desc: MarkdownModelProperty) {
    this._propertyDescription = desc;
    this.updatePlaceholder(desc);
    this.updateHelpText(desc);
    this.formControl.setValidators(desc.getValidators());
  };
  public setPropertyDescription(desc: ModelProperty) {
    this.propertyDescription = (<MarkdownModelProperty>desc);
  }

}
