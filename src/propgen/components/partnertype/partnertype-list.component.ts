import {Component, OnInit} from '@angular/core';
import {SortableEntity} from '../../model/SortableEntity';
import {Router} from '@angular/router';
import {PartnertypeService} from '../../services/partnertype.service';
import {PartnerType} from '../../model/PartnerType';

const path = '/partnertype';

@Component({
  selector: 'propgen-partnertype-list',
  templateUrl: './partnertype-list.component.html'
})
export class PartnertypeListComponent implements OnInit {
  constructor(private partnertypeService: PartnertypeService, private router: Router) {}
  private data: PartnerType[];
  protected sortableData: SortableEntity[];
  ngOnInit(): void {
    this.partnertypeService.getAll().subscribe(
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
