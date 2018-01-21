import {Injectable} from '@angular/core';
import {Task} from '../model/Task';
import {HttpClient} from '@angular/common/http';
import {VersionedBackendService} from './versioned-backend.service';

@Injectable()
export class TaskService extends VersionedBackendService<Task> {
  protected getEndpoint(): string {
    return '/Task';
  }

  ensureConstructor(item: Task): Task {
    return new Task(item);
  }
  constructor(protected http: HttpClient) {
    super(http);
  }
}
