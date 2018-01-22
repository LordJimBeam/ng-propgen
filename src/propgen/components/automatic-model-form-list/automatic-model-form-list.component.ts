import {Component, Injector} from '@angular/core';
import {SortableEntity} from '../../model/SortableEntity';
import {ActivatedRoute, Router} from '@angular/router';
import {AutogeneratableModel} from '../../model/AutogeneratableModel';
import {BackendService} from '../../services/backend.service';
import {VersionedBackendService} from '../../services/versioned-backend.service';
import {ReorderService} from '../../services/reorder.service';
import {AutogeneratableOrderableModel} from '../../model/AutogeneratableOrderableModel';

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
export class AutomaticModelFormListComponent {
  constructor(
    private router: Router,
    private reorder: ReorderService,
    route: ActivatedRoute,
    injector: Injector
    ) {
    // TODO: route.data is an observable so the lambda could be called multiple times in theory. check if this is an issue
    route.data.subscribe((data) => {
      this.path = data.path;
      this.title = data.title;
      this.service = injector.get<BackendService<any>>(data.service);
      this.hasVersioning = (this.service instanceof VersionedBackendService);
      this.service.getAll().subscribe(
        (result) => {
          this.data = result;
          if(this.data.length > 0) {
            this.canReorder = this.data[0] instanceof AutogeneratableOrderableModel;
          }
          Promise.all(this.data.map((d) => {
            return d.toListItem(injector);
          })).then((data) => {
            this.sortableData = data;
          });
        },
        (error) => {
          console.error(error)
        }
      );
    });
  }
  private data: AutogeneratableModel[];
  protected sortableData: SortableEntity[];
  protected title: string;
  protected path: string;
  protected hasVersioning: boolean = false;
  protected canReorder: boolean = false;
  protected service: BackendService<any>;

  protected add(): void {
    this.router.navigate([this.path, 'add']);
  }
  protected edit($event): void {
    this.router.navigate([this.path, $event.id]);
  }
  protected onReorder($event): void {
    if(this.canReorder) {
      // TODO: freeze UI and display progress notification
      let dirtyData = this.reorder.calculateReordering($event, <AutogeneratableOrderableModel[]>this.data);
      this.service.saveOrder(dirtyData).then(() => {

      }).catch((error) => {
        console.error(error);
      });
    }
  }
  protected routeToVersion($event) {
    this.router.navigate([this.path, $event.id, 'versions']);
  }
}
