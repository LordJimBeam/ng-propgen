import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Workpackage} from '../../model/Workpackage';
import {Router, ActivatedRoute, ParamMap} from '@angular/router';
import 'rxjs/add/operator/switchMap';
import {WorkpackageService} from '../../services/workpackage.service';
import {PartnertypeService} from '../../services/partnertype.service';
import {PartnerType} from '../../model/PartnerType';

@Component({
  selector: 'propgen-partnertype',
  templateUrl: './partnertype.component.html'
})
export class PartnertypeComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private partnertypeService: PartnertypeService
  ) {}
  ngOnInit(): void {
    let id = Number(this.route.snapshot.paramMap.get('id'));
    if(isNaN(id)) {
      this.partnertype = new PartnerType();
    }
    else {
      this.partnertypeService.get(id).then((result) => {
        this.partnertype = result;
      });
    }
  }
  protected partnertype: PartnerType;
  protected onSave() {
    console.log(this.partnertype);
    this.partnertypeService.save(this.partnertype)
      .then(() => this.onCancel())
      .catch((error) => {
        console.error(error);
      });
  }
  protected onCancel() {
    this.router.navigate(['/partnertypes']);
  }
}
