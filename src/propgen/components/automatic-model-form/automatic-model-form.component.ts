import {Component, Injector} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {BackendService} from '../../services/backend.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'propgen-automatic-model-form',
  template: '<propgen-detail-editor\n' +
  '  [title]="title"\n' +
  '  (onCancel)="onCancel()"\n' +
  '  (onSave)="onSave()"\n' +
  '    [enabled]="ready"\n' +
  '    [(ngModel)]="data">\n' +
  '    </propgen-detail-editor>'
})
export class AutomaticModelFormComponent {

  constructor(
    protected router: Router,
    protected snackBar: MatSnackBar,
    route: ActivatedRoute,
    injector: Injector
  ) {
    route.data.subscribe((data) => {
      this.listPath = data.parent;
      this.title = data.title;
      this.service = injector.get<BackendService<any>>(data.service);
      route.paramMap.subscribe((paramMap) => {
        let id = Number(paramMap.get('id'));
        if(!isNaN(id) || id < 1) {
          // requested specific id, fetch from server
          this.service.get(id).then((result) => {
            this.data = result;
            this.ready = true;
          }).catch((error) => {
            console.error(error);
            this.snackBar.open('Could not get data from server. Your data might be outdated.', 'Dismiss', {
              verticalPosition: "top"
            });
          });
        }
        else {
          // got a number less than 1 or a string => create new item
          this.data = this.service.ensureConstructor({});
          this.ready = true;
        }
      })
    });
  }
  protected ready = false;
  protected service: BackendService<any>;
  protected data: AutomaticModelFormComponent;
  protected listPath: string;
  protected title: string;
  protected onSave() {
    this.service.save(this.data)
      .then(() => this.routeToList())
      .catch((error) => {
        console.error(error);
        this.snackBar.open('Could not save changes. See error log for details.', 'Dismiss', {
          verticalPosition: "top"
        });
      });
  }
  protected onCancel() {
    this.routeToList();
  }
  protected routeToList() {
    this.router.navigate([this.listPath]);
  }

}
