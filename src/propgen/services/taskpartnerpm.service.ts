import {Injectable} from '@angular/core';
import {TaskPartnerPM} from '../model/TaskPartnerPM';
import {BackendService} from './backend.service';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class TaskPartnerPMService extends BackendService<TaskPartnerPM> {
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
