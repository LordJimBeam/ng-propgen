import {ActivatedRoute, Router} from '@angular/router';
import {OnInit} from '@angular/core';
import {RESTModelInterface} from '../../model/RESTModelInterface';
import {BackendService} from '../../services/backend.service';
import {AutogeneratableModel} from '../../model/AutogeneratableModel';

export abstract class EditorBase<T extends AutogeneratableModel> implements OnInit {
  constructor(
    protected route: ActivatedRoute
  ) {}
  protected abstract getEntityService(): BackendService<T>;
  protected abstract set entity(entity: T);
  protected abstract get entity(): T;
  protected abstract routeToList();
  ngOnInit(): void {
    let id = Number(this.route.snapshot.paramMap.get('id'));
    if(!isNaN(id)) {
      // requested specific id, fetch from server
      this.getEntityService().get(id).then((result) => {
        this.entity = result;
        this.ready = true;
      });
    }
    else {
      // all good as it is
      this.ready = true;
    }
  }
  protected ready = false;
  protected onSave() {
    this.getEntityService().save(this.entity)
      .then(() => this.routeToList())
      .catch((error) => {
        console.error(error);
      });
  }
  protected onCancel() {
    this.routeToList();
  }
}
