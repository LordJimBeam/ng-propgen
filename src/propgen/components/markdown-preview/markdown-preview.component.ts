import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'propgen-markdown-preview',
  templateUrl: './markdown-preview.component.html',
  styleUrls: ['./markdown-preview.component.css']
})
export class MarkdownPreviewComponent {
  private text: string;
  @Input() placeholder: string;
  @Output() mdTextChange = new EventEmitter<string>();
  @Input() get mdText() {
    return this.text;
  }
  set mdText(text: string) {
    this.text = text;
    this.mdTextChange.emit(this.text);
  }
}
