import {Injectable} from '@angular/core';
import {TaskPartnerPM} from '../model/TaskPartnerPM';
import {HttpClient} from '@angular/common/http';
import {VersionedBackendService} from './versioned-backend.service';

@Injectable()
export class TaskPartnerPMService extends VersionedBackendService<TaskPartnerPM> {
  protected getEndpoint(): string {
    return '/TaskPartnerPM';
  }

  ensureConstructor(item: TaskPartnerPM): TaskPartnerPM {
    return new TaskPartnerPM(item);
  }

  constructor(protected http: HttpClient) {
    super(http);
  }
}
