import {StringModelProperty} from './string.model.property';
import {MarkdownPreviewComponent} from './formcomponents/markdown-preview/markdown-preview.component';
import {ModelProperty} from './model.property';

export class MarkdownModelProperty extends ModelProperty<string> {
  public component: any;
  public constructor(init?: Partial<StringModelProperty>) {
    super();
    Object.assign(this, init);
  }

  public isValid(value: string): boolean {
    return true;
  }
}
