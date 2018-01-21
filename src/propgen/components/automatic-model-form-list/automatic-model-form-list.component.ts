import {Component, Injector} from '@angular/core';
import {SortableEntity} from '../../model/SortableEntity';
import {ActivatedRoute, Router} from '@angular/router';
import {AutogeneratableModel} from '../../model/AutogeneratableModel';
import {BackendService} from '../../services/backend.service';
import {VersionedBackendService} from '../../services/versioned-backend.service';

@Component({
  selector: 'propgen-automatic-model-form-list',
  template: '<propgen-sortable-list\n' +
  '  (onCreateEntity)="add()"\n' +
  '  (onEditEntity)="edit($event)"\n' +
  '  (onVersionEntity)="routeToVersion($event)"\n' +
  '  [title]="title"\n' +
  '  (onReorder)="onReorder($event)"\n' +
  '  [entities]="sortableData"\n' +
  '  [hasVersioning]="hasVersioning">\n' +
  '</propgen-sortable-list>'
})
export class AutomaticModelFormListComponent {
  constructor(
    private router: Router,
    route: ActivatedRoute,
    injector: Injector
    ) {
    // TODO: route.data is an observable so the lambda could be called multiple times in theory. check if this is an issue
    route.data.subscribe((data) => {
      this.path = data.path;
      this.title = data.title;
      let service = injector.get<BackendService<any>>(data.service);
      this.hasVersioning = (service instanceof VersionedBackendService);
      service.getAll().subscribe(
        (result) => {
          this.data = result;
          Promise.all(this.data.map((d) => {
            return d.toListItem(injector);
          })).then((data) => {
            console.log(data);
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

  protected add(): void {
    this.router.navigate([this.path, 'add']);
  }
  protected edit($event): void {
    this.router.navigate([this.path, $event.id]);
  }
  protected onReorder($event): void {

  }
  protected routeToVersion($event) {
    this.router.navigate([this.path, $event.id, 'versions']);
  }
}
