import {Component, OnInit} from '@angular/core';
import {Workpackage} from '../../model/Workpackage';
import {WorkpackageService} from '../../services/workpackage.service';
import {SortableEntity} from '../../model/SortableEntity';
import {Router} from '@angular/router';

@Component({
  selector: 'propgen-workpackage-list',
  templateUrl: './workpackage-list.component.html'
})
export class WorkpackageListComponent implements OnInit {
  constructor(private workpackageService: WorkpackageService, private router: Router) {}
  private data: Workpackage[];
  protected sortableData: SortableEntity[];
  ngOnInit(): void {
    this.workpackageService.getAll().subscribe(
      (result) => {
        this.data = result;
        this.sortableData = this.data.map((d) => {
          return new SortableEntity(d.title, d.id)
        });
      },
      (error) => {
        console.error(error)
      }
    );
  }
  protected addWorkpackage(): void {
    console.log('clicked add button');
    this.router.navigate(['/workpackage/add']);
  }
  protected editWorkpackage($event): void {
    console.log('clicked edit button');
    console.log($event);
    this.router.navigate(['/workpackage', $event.id]);
  }
  protected onReorder($event): void {
    console.log('reordered');
    console.log($event);
  }

}
