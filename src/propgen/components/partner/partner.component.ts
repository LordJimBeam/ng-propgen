import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Workpackage} from '../../model/Workpackage';
import {Router, ActivatedRoute, ParamMap} from '@angular/router';
import 'rxjs/add/operator/switchMap';
import {WorkpackageService} from '../../services/workpackage.service';
import {PartnertypeService} from '../../services/partnertype.service';
import {PartnerType} from '../../model/PartnerType';
import {EditorBase} from '../editor-base/editor-base';
import {BackendService} from '../../services/backend.service';
import {Partner} from '../../model/Partner';
import {PartnerService} from '../../services/partner.service';

@Component({
  selector: 'propgen-partner',
  templateUrl: './partner.component.html'
})
export class PartnerComponent extends EditorBase<Partner> {

  constructor(
    protected route: ActivatedRoute,
    protected router: Router,
    protected partnerService: PartnerService
  ) {
    super(route);
  }
  private partner: Partner = new Partner({});

  protected getEntityService(): BackendService<Partner> {
    return this.partnerService;
  }
  protected get entity(): Partner {
    return this.partner;
  }
  protected set entity(entity: Partner) {
    this.partner = entity;
  }
  protected routeToList() {
    this.router.navigate(['/partners']);
  }
}
