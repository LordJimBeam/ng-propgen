import {Injectable} from '@angular/core';
import {BackendService} from './backend.service';
import {Milestone} from '../model/Milestone';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class MilestoneService extends BackendService<Milestone> {
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
