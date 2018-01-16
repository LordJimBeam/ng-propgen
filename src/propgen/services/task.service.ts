import {Injectable} from '@angular/core';
import {BackendService} from './backend.service';
import {Task} from '../model/Task';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class TaskService extends BackendService<Task> {
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
