import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Workpackage} from '../../model/Workpackage';
import {Router, ActivatedRoute, ParamMap} from '@angular/router';
import 'rxjs/add/operator/switchMap';
import {WorkpackageService} from '../../services/workpackage.service';

@Component({
  selector: 'propgen-workpackage',
  templateUrl: './workpackage.component.html'
})
export class WorkpackageComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private workpackageService: WorkpackageService
  ) {}
  ngOnInit(): void {
    let id = Number(this.route.snapshot.paramMap.get('id'));
    if(isNaN(id)) {
      this.workpackage = new Workpackage();
    }
    else {
      this.workpackageService.get(id).then((result) => {
        this.workpackage = result;
      });
    }
  }
  protected workpackage: Workpackage;
  protected onSave() {
    console.log(this.workpackage);
    this.workpackageService.save(this.workpackage)
      .then(() => this.onCancel())
      .catch((error) => {
      console.error(error);
    });
  }
  protected onCancel() {
    this.router.navigate(['/workpackages']);
  }
}
