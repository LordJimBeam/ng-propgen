import {
  AfterViewInit,
  Component, ComponentFactoryResolver, EventEmitter, forwardRef, Input, Output, ViewChild,
  ViewContainerRef
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {MarkdownPreviewComponent} from '../../modelcreator/formcomponents/markdown-preview/markdown-preview.component';
import {StringFormComponent} from '../../modelcreator/formcomponents/string.form.component';
import {ModelPropertyComponent} from '../../modelcreator/formcomponents/model.form.component';
import {NumberFormComponent} from '../../modelcreator/formcomponents/number.form.component';
import {ForeignKeyFormComponent} from '../../modelcreator/formcomponents/foreign.form.component';
import {AutogeneratableModel} from '../../model/AutogeneratableModel';


const typeToComponentMap = new Object({
  ForeignKeyModelProperty: ForeignKeyFormComponent,
  NumberModelProperty: NumberFormComponent,
  MarkdownModelProperty: MarkdownPreviewComponent,
  StringModelProperty: StringFormComponent
});
const dynamicComponents = Object.keys(typeToComponentMap).map((key) => typeToComponentMap[key]);


@Component({
  selector: 'propgen-detail-editor',
  templateUrl: './detail-editor.component.html',
  entryComponents: dynamicComponents,
  providers: [{
    provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => DetailEditorComponent), multi: true
  }]
})
export class DetailEditorComponent implements ControlValueAccessor, AfterViewInit {
  constructor(private resolver: ComponentFactoryResolver) {

  }
  @Input() title: string;
  @Input() enabled: boolean;
  @Output() onSave = new EventEmitter();
  @Output() onCancel = new EventEmitter();
  @ViewChild('propertyContainer', { read: ViewContainerRef }) propertyContainer: ViewContainerRef;

  protected onSaveClick() {
    this.onSave.emit();
  }

  protected onCancelClick() {
    this.onCancel.emit();
  }

  private viewInitialized = false;

  writeValue(obj: AutogeneratableModel): void {
    // This method will be called by the forms API to write to the view when programmatic (model -> view) changes are requested.
    this._data = obj;
    this.createChildren();
  }

  registerOnChange(fn: (_: any) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }

  protected onChange = (_) => {};
  protected onTouched = () => {};

  ngAfterViewInit(): void {
    this.viewInitialized = true;
    this.createChildren();
  }

  private createChildren() {
    if(this.viewInitialized && this._data) {

      this.propertyContainer.clear();

      // we need to resolve the factory for each component only once, so store them in here
      let factories = {};

      for(let prop of this._data.getProperties()) {
        if(!prop.component) {
          // instance.constructor.name gets the TS class name during JS runtime. Object keys are always string
          if(prop.constructor.name in typeToComponentMap) {
            prop.component = typeToComponentMap[prop.constructor.name];
          }
          else {
            console.log(prop);
            console.log(prop.name + ' (' + prop.constructor.name + ') has an empty component, skipping');
            continue;
          }
        }
        if(!(prop.component in factories)) {
          factories[prop.component] = this.resolver.resolveComponentFactory(prop.component);
        }
        let factory = factories[prop.component];
        let componentRef = this.propertyContainer.createComponent(factory);
        let instance = (<ModelPropertyComponent>componentRef.instance);
        instance.data = this._data[prop.name];
        instance.dataChange.subscribe((d) => this.data[prop.name] = d);
        instance.setPropertyDescription(prop);
      }


    }
  }

  private createdChildren = false;
  private _data: AutogeneratableModel;
  private get data(): AutogeneratableModel {
    return this._data;
  };
  private set data(d: AutogeneratableModel) {
    if(d !== this._data) {
      this._data = d;
      this.onChange(d);
    }
  }
}
