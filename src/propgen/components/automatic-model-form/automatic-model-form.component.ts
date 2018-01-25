import {Component, Injector, Input, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {BackendService} from '../../services/backend.service';
import {MatSnackBar, MatSnackBarRef, SimpleSnackBar} from '@angular/material';
import {HttpErrorResponse} from '@angular/common/http';
import {RESTModelInterface} from '../../model/RESTModelInterface';
import {PartnerService} from '../../services/partner.service';
import {DefaultBackendService} from '../../services/default-backend.service';
import {AutogeneratableProperties} from '../../decorators/autogeneratable.decorator';
import {Subscription} from 'rxjs/Subscription';
import {AutogeneratableModel} from '../../model/AutogeneratableModel';

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
export class AutomaticModelFormComponent implements OnDestroy {

  constructor(
    protected router: Router,
    protected snackBar: MatSnackBar,
    // route: ActivatedRoute,
    protected injector: Injector,
    protected backend: DefaultBackendService,
  ) {
    // route.data.subscribe((data) => {
    //   this.listPath = data.parent;
    //   this.title = data.title;
    //   this.service = injector.get<BackendService<any>>(data.service);
    //   route.paramMap.subscribe((paramMap) => {
    //     let id = Number(paramMap.get('id'));
    //     if(!isNaN(id) || id < 1) {
    //       // requested specific id, fetch from server
    //       this.service.get(id).then((result) => {
    //         this.data = result;
    //         this.ready = true;
    //       }).catch((error) => {
    //         console.error(error);
    //         if(error instanceof HttpErrorResponse && error.status === 404) {
    //           // Django returns a 500 status code if the ID does not exist, but this is the future proof way
    //           this.snackBarRef = this.snackBar.open('The ID you requested does not exist in the database.', 'Back to overview', {
    //             verticalPosition: "top"
    //           });
    //           this.snackBarRef.onAction().subscribe(() => {
    //             this.routeToList();
    //           })
    //         }
    //         else {
    //           let message = 'Could not get data from server.';
    //           if(this.data) {
    //             // already have some from the cache
    //             message += ' Your data might be outdated.';
    //           }
    //           this.snackBarRef = this.snackBar.open(message, 'Reload page', {
    //             verticalPosition: "top"
    //           });
    //           this.snackBarRef.onAction().subscribe(() => {
    //             window.location.reload();
    //           });
    //         }
    //       });
    //     }
    //     else {
    //       // got a number less than 1 or a string => create new item
    //       this.data = this.service.ensureConstructor({});
    //       this.ready = true;
    //     }
    //   })
    // });
  }
  public ready = false;
  // protected service: BackendService<any>;
  public data: AutogeneratableModel;
  protected listPath: string;
  public title: string;
  protected snackBarRef: MatSnackBarRef<SimpleSnackBar>;
  private _type;
  private _id = null;
  @Input() public set type(t) {
    this._type = t;
    let generatorProperties: AutogeneratableProperties = t.prototype._autogeneratable;
    this.title = generatorProperties.detailTitle;
    this.listPath = generatorProperties.listRoute;
    this.fetch();
  }
  @Input() public set id(n: number) {
    this._id = n;
    this.fetch();
  }
  private fetch() {
    if(this._type && this._id !== null) {
      let id = Number(this._id);
      if(!isNaN(id) || id < 1) {
        // requested specific id, fetch from server
        this.backend.get(this._type, id).then((result) => {
          this.data = result;
          this.ready = true;
        }).catch((error) => {
          console.error(error);
          if(error instanceof HttpErrorResponse && error.status === 404) {
            // Django returns a 500 status code if the ID does not exist, but this is the future proof way
            this.snackBarRef = this.snackBar.open('The ID you requested does not exist in the database.', 'Back to overview', {
              verticalPosition: "top"
            });
            this.snackBarRef.onAction().subscribe(() => {
              this.routeToList();
            })
          }
          else {
            let message = 'Could not get data from server.';
            if(this.data) {
              // already have some from the cache
              message += ' Your data might be outdated.';
            }
            this.snackBarRef = this.snackBar.open(message, 'Reload page', {
              verticalPosition: "top"
            });
            this.snackBarRef.onAction().subscribe(() => {
              window.location.reload();
            });
          }
        });
      }
      else {
        // got a number less than 1 or a string => create new item
        this.data = this._type({});
        this.ready = true;
      }
    }
  }

  ngOnDestroy(): void {
    if(this.snackBarRef) {
      this.snackBarRef.dismiss();
    }
  }
  public onSave() {
    this.backend.save(this._type, this.data)
      .then(() => this.routeToList())
      .catch((error) => {
        console.error(error);
        this.snackBarRef = this.snackBar.open('Could not save changes. See error log for details.', 'Dismiss', {
          verticalPosition: "top"
        });
      });
  }
  public onCancel() {
    this.routeToList();
  }
  protected routeToList() {
    this.router.navigate([this.listPath]);
  }

}
