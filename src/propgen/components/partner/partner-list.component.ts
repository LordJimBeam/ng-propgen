import {Component, OnInit} from '@angular/core';
import {SortableEntity} from '../../model/SortableEntity';
import {Router} from '@angular/router';
import {Partner} from '../../model/Partner';
import {PartnerService} from '../../services/partner.service';

const path = '/partner';

@Component({
  selector: 'propgen-partner-list',
  templateUrl: './partner-list.component.html'
})
export class PartnerListComponent implements OnInit {
  constructor(private partnerService: PartnerService, private router: Router) {}
  private data: Partner[];
  protected sortableData: SortableEntity[];
  ngOnInit(): void {
    this.partnerService.getAll().subscribe(
      (result) => {
        this.data = result;
        this.sortableData = this.data.map((d) => {
          return d.toListItem();
        });
      },
      (error) => {
        console.error(error)
      }
    );
  }
  protected add(): void {
    this.router.navigate([path, 'add']);
  }
  protected edit($event): void {
    this.router.navigate([path, $event.id]);
  }
  protected onReorder($event): void {

  }

}
