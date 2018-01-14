import {Component, OnInit} from '@angular/core';
import {SortableEntity} from '../../model/SortableEntity';
import {Router} from '@angular/router';
import {PartnertypeService} from '../../services/partnertype.service';
import {PartnerType} from '../../model/PartnerType';

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
          return new SortableEntity(d.shortname, d.id)
        });
      },
      (error) => {
        console.error(error)
      }
    );
  }
  protected addWorkpackage(): void {
    this.router.navigate(['/partnertype', 'add']);
  }
  protected editWorkpackage($event): void {
    this.router.navigate(['/partnertype', $event.id]);
  }
  protected onReorder($event): void {

  }

}
