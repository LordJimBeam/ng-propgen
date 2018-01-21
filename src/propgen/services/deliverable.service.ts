import {Injectable} from '@angular/core';
import {Deliverable} from '../model/Deliverable';
import {HttpClient} from '@angular/common/http';
import {VersionedBackendService} from './versioned-backend.service';

@Injectable()
export class DeliverableService extends VersionedBackendService<Deliverable> {
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
