import {Component, Injector, Input, OnDestroy} from '@angular/core';
import {Version} from '../../model/Version';
import {RESTModelInterface} from '../../model/RESTModelInterface';
import {ActivatedRoute} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import {MatSnackBar, MatSnackBarRef, SimpleSnackBar} from '@angular/material';
import {VersionedBackendService} from '../../services/versioned-backend.service';

@Component({
  selector: 'propgen-automatic-model-form-version-list',
  template: '<h1>Versions of {{title}}</h1>' +
  '<mat-paginator *ngIf="data.length > 10" [length]="data.length" [pageSize]="pageSize" [pageIndex]="page" (page)="onPaginatorChanged($event)"></mat-paginator>' +
  '<mat-list>' +
  '  <mat-list-item *ngFor="let d of currentData">' +
  '    <h3 mat-line class="mat-headline">{{d.object_repr}}</h3>' +
  '    <p mat-line>{{d.revision.date_created}} by {{d.revision.user ? d.revision.user : "None"}}</p>' +
  '    <p mat-line>{{d.revision.comment}}</p>' +
  '    <a mat-line routerLink="../version/{{d.id}}">Details</a>' +
  '  </mat-list-item>' +
  '</mat-list>'
})
export class AutomaticModelFormVersionListComponent implements OnDestroy {
  constructor(route: ActivatedRoute, injector: Injector, snackBar: MatSnackBar) {
    // TODO: route.data is an observable so the lambda could be called multiple times in theory. check if this is an issue
    route.data.subscribe((data) => {
      this.title = data.title;
      let service = injector.get<VersionedBackendService<RESTModelInterface>>(data.service);
      route.paramMap.subscribe((paramMap) => {
        let id = Number(paramMap.get('id'));
        if (!isNaN(id) || id < 1) {
          // requested specific id, fetch from server
          service.getVersions(id).then((result) => {
            this.data = result;
            this.ready = true;
          }).catch((error) => {
            console.error(error);
            if (error instanceof HttpErrorResponse && error.status === 404) {
              // Django returns a 500 status code if the ID does not exist, but this is the future proof way
              this.snackBarRef = snackBar.open('The ID you requested does not exist in the database.', 'Dismiss', {
                verticalPosition: "top"
              });
            }
            else {
              let message = 'Could not get data from server.';
              if (this.data) {
                // already have some from the cache
                message += ' Your data might be outdated.';
              }
              this.snackBarRef = snackBar.open(message, 'Reload page', {
                verticalPosition: "top"
              });
              this.snackBarRef.onAction().subscribe(() => {
                window.location.reload();
              });
            }
          });
        }
      });
    });
  }
  @Input() public title: string;
  public ready = false;
  protected snackBarRef: MatSnackBarRef<SimpleSnackBar>;
  ngOnDestroy() {
    if(this.snackBarRef) {
      this.snackBarRef.dismiss();
    }
  }
  protected _data = [];
  public get data() {
    return this._data;
  }
  @Input() public set data(d: Array<Version<RESTModelInterface>>) {
    this._data = d;
    this.updatePageData();
  }
  public currentData = [];
  protected pageSize = 10;
  protected page = 0;
  protected onPaginatorChanged($event) {
    this.pageSize = $event.pageSize;
    this.page = $event.pageIndex;

    this.updatePageData();
  }
  protected updatePageData() {
    let startIndex = this.pageSize * this.page;
    let endIndex = startIndex + this.pageSize;
    this.currentData = this.data.slice(startIndex, endIndex + 1);
  }
}
