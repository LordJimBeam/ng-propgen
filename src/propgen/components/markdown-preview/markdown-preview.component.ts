import {Component, forwardRef, Input} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'propgen-markdown-preview',
  templateUrl: './markdown-preview.component.html',
  styleUrls: ['./markdown-preview.component.css'],
  providers: [
    {provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => MarkdownPreviewComponent), multi: true}
  ],
})
export class MarkdownPreviewComponent implements ControlValueAccessor {
  writeValue(obj: string): void {
    // This method will be called by the forms API to write to the view when programmatic (model -> view) changes are requested.
    this.text = obj;
  }

  registerOnChange(fn: (_: any) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }

  protected onChange = (_) => {};
  protected onTouched = () => {};
  private text: string;
  @Input() placeholder: string;
  get mdText() {
    return this.text;
  }
  set mdText(text: string) {
    if(text !== this.text) {
      this.text = text;
      this.onChange(this.text);
    }
  }

}
