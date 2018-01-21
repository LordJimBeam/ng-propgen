import {Component, Injector, OnDestroy} from '@angular/core';
import {MatSnackBar, MatSnackBarRef, SimpleSnackBar} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import {Version} from '../../model/Version';
import {VersionedBackendService} from '../../services/versioned-backend.service';
import {RESTModelInterface} from '../../model/RESTModelInterface';

@Component({
  selector: 'propgen-automatic-model-form-version',
  template: '<propgen-detail-editor\n' +
  '  [readonly]="true"\n' +
  '  [enabled]="ready"\n' +
  '  [(ngModel)]="data"\n' +
  '  (onCancel)="onCancel()">\n' +
  '</propgen-detail-editor>'
})
export class AutomaticModelFormVersionComponent implements OnDestroy {
  constructor(
    snackBar: MatSnackBar,
    injector: Injector,
    protected route: ActivatedRoute,
    protected router: Router
  ) {
    route.data.subscribe((data) => {
      this.title = data.title;
      const service = injector.get<VersionedBackendService<any>>(data.service);
      route.paramMap.subscribe((paramMap) => {
        let id = Number(paramMap.get('id'));
        let versionId = Number(paramMap.get('version_id'));
        if(!isNaN(id) && id > 0 && !isNaN(versionId) && versionId > 0) {
          // requested specific id, fetch from server
          service.getVersion(id, versionId).then((result) => {
            this.version = result;
            let object = JSON.parse(result.serialized_data)[0];
            console.log(object);
            this.data = service.ensureConstructor(object.fields);
            console.log(this.data);
            this.ready = true;
          }).catch((error) => {
            console.error(error);
            if(error instanceof HttpErrorResponse && error.status === 404) {
              // Django returns a 500 status code if the ID does not exist, but this is the future proof way
              this.snackBarRef = snackBar.open('The ID you requested does not exist in the database.', 'Dismiss', {
                verticalPosition: "top"
              });
            }
            else {
              let message = 'Could not get data from server.';
              this.snackBarRef = snackBar.open(message, 'Reload page', {
                verticalPosition: "top"
              });
              this.snackBarRef.onAction().subscribe(() => {
                window.location.reload();
              });
            }
          });
        }
      })
    });
  }
  protected ready = false;
  protected title: string;
  protected snackBarRef: MatSnackBarRef<SimpleSnackBar>;
  protected data: RESTModelInterface;
  protected version: Version<any>;
  ngOnDestroy(): void {
    if(this.snackBarRef) {
      this.snackBarRef.dismiss();
    }
  }
  protected onCancel() {
    this.router.navigate(['../../versions/'], { relativeTo: this.route });
  }
}
