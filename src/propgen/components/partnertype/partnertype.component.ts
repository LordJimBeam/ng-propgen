import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Workpackage} from '../../model/Workpackage';
import {Router, ActivatedRoute, ParamMap} from '@angular/router';
import 'rxjs/add/operator/switchMap';
import {WorkpackageService} from '../../services/workpackage.service';
import {PartnertypeService} from '../../services/partnertype.service';
import {PartnerType} from '../../model/PartnerType';
import {EditorBase} from '../editor-base/editor-base';
import {BackendService} from '../../services/backend.service';

@Component({
  selector: 'propgen-partnertype',
  templateUrl: './partnertype.component.html'
})
export class PartnertypeComponent extends EditorBase<PartnerType> {

  constructor(
    protected route: ActivatedRoute,
    protected router: Router,
    protected partnertypeService: PartnertypeService
  ) {
    super(route);
  }
  protected partnertype: PartnerType = new PartnerType();

  protected getEntityService(): BackendService<PartnerType> {
    return this.partnertypeService;
  }
  protected get entity(): PartnerType {
    return this.partnertype;
  }
  protected set entity(entity: PartnerType) {
    this.partnertype = entity;
  }
  protected routeToList() {
    this.router.navigate(['/partnertypes']);
  }
}
