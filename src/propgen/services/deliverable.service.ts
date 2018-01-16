import {Injectable} from '@angular/core';
import {BackendService} from './backend.service';
import {Deliverable} from '../model/Deliverable';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class DeliverableService extends BackendService<Deliverable> {
  protected getEndpoint(): string {
    return '/Deliverable';
  }

  ensureConstructor(item: Deliverable): Deliverable {
    return new Deliverable(item);
  }
  constructor(protected http: HttpClient) {
    super(http);
  }
}
