import {Component, Injector, Input, OnDestroy} from '@angular/core';
import {SortableEntity} from '../../model/SortableEntity';
import {ActivatedRoute, Router} from '@angular/router';
import {AutogeneratableModel} from '../../model/AutogeneratableModel';
import {BackendService} from '../../services/backend.service';
import {VersionedBackendService} from '../../services/versioned-backend.service';
import {ReorderService} from '../../services/reorder.service';
import {AutogeneratableOrderableModel} from '../../model/AutogeneratableOrderableModel';
import {DefaultBackendService} from '../../services/default-backend.service';
import {WorkpackageService} from '../../services/workpackage.service';
import {AutogeneratableProperties} from '../../decorators/autogeneratable.decorator';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'propgen-automatic-model-form-list',
  template: '<propgen-sortable-list\n' +
  '  (onCreateEntity)="add()"\n' +
  '  (onEditEntity)="edit($event)"\n' +
  '  (onVersionEntity)="routeToVersion($event)"\n' +
  '  [title]="title"\n' +
  '  (onReorder)="onReorder($event)"\n' +
  '  [entities]="sortableData"\n' +
  '  [hasVersioning]="hasVersioning"\n' +
  '  [canReorder]="canReorder">\n' +
  '</propgen-sortable-list>'
})
export class AutomaticModelFormListComponent implements OnDestroy {
  constructor(
    private router: Router,
    private reorder: ReorderService,
    private backend: DefaultBackendService,
    private injector: Injector,
    ) {
    // TODO: route.data is an observable so the lambda could be called multiple times in theory. check if this is an issue
    // route.data.subscribe((data) => {
    //   this.path = data.path;
    //   this.title = data.title;
    //   this.service = injector.get<BackendService<any>>(data.service);
    //   this.hasVersioning = (this.service instanceof VersionedBackendService);
    //   this.service.getAll().subscribe(
    //     (result) => {
    //       this.data = result;
    //       if(this.data.length > 0) {
    //         this.canReorder = this.data[0] instanceof AutogeneratableOrderableModel;
    //       }
    //       Promise.all(this.data.map((d) => {
    //         return d.toListItem(injector);
    //       })).then((data) => {
    //         this.sortableData = data;
    //       });
    //     },
    //     (error) => {
    //       console.error(error)
    //     }
    //   );
    // });
  }
  private data: AutogeneratableModel[];
  public sortableData: SortableEntity[] = [];
  public title: string;
  protected path: string;
  public hasVersioning: boolean = false;
  public canReorder: boolean = false;
  protected service: BackendService<any>;
  private onReceiveData(next) {
    this.data = next;
    Promise.all(this.data.map((d) => {
      return d.toListItem(this.injector);
    })).then((data) => {
      this.sortableData = data;
    });
  }
  private onReceiveError(error) {
    console.error(error);
  }
  private subscription: Subscription;
  ngOnDestroy() {
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  private _type: any;
  @Input() public set type(t: any) {
    this._type = t;
    this.subscription = this.backend.getAll(t).subscribe((next) => this.onReceiveData(next), (error) => this.onReceiveError(error));
    let generatorProperties: AutogeneratableProperties = t.prototype._autogeneratable;
    this.hasVersioning = generatorProperties.hasVersioning;
    this.canReorder = generatorProperties.orderable;
    this.path = generatorProperties.detailRoute.replace(':id', '');
    this.title = generatorProperties.listTitle;
  }

  public add(): void {
    this.router.navigate([this.path, 'add']);
  }
  public edit($event): void {
    this.router.navigate([this.path, $event.id]);
  }
  public onReorder($event): void {
    if(this.canReorder) {
      // TODO: freeze UI and display progress notification
      let dirtyData = this.reorder.calculateReordering($event, <AutogeneratableOrderableModel[]>this.data);
      this.backend.saveOrder(this._type, dirtyData).then(() => {

      }).catch((error) => {
        console.error(error);
      });
    }
  }
  public routeToVersion($event) {
    this.router.navigate([this.path, $event.id, 'versions']);
  }
}
