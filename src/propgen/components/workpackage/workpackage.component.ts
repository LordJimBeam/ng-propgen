import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Workpackage} from '../../model/Workpackage';
import {Router, ActivatedRoute, ParamMap} from '@angular/router';
import 'rxjs/add/operator/switchMap';
import {WorkpackageService} from '../../services/workpackage.service';
import {EditorBase} from '../editor-base/editor-base';
import {PartnerType} from '../../model/PartnerType';
import {PartnertypeService} from '../../services/partnertype.service';
import {BackendService} from '../../services/backend.service';

@Component({
  selector: 'propgen-workpackage',
  templateUrl: './workpackage.component.html'
})
export class WorkpackageComponent extends EditorBase<Workpackage> {
  constructor(
    protected route: ActivatedRoute,
    protected router: Router,
    protected workpackageService: WorkpackageService
  ) {
    super(route);
  }
  protected workpackage: Workpackage = new Workpackage();

  protected getEntityService(): BackendService<Workpackage> {
    return this.workpackageService;
  }
  protected get entity(): Workpackage {
    return this.workpackage;
  }
  protected set entity(entity: Workpackage) {
    this.workpackage = entity;
  }
  protected routeToList() {
    this.router.navigate(['/workpackages']);
  }
}
