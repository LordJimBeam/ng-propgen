import {Injectable} from '@angular/core';
import {Milestone} from '../model/Milestone';
import {HttpClient} from '@angular/common/http';
import {VersionedBackendService} from './versioned-backend.service';

@Injectable()
export class MilestoneService extends VersionedBackendService<Milestone> {
  protected getEndpoint(): string {
    return '/Milestone';
  }

  ensureConstructor(item: Milestone): Milestone {
    return new Milestone(item);
  }
  constructor(protected http: HttpClient) {
    super(http);
  }

}
