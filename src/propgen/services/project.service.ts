import {BackendService} from './backend.service';
import {Project} from '../model/Project';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class ProjectService extends BackendService<Project> {
  protected getEndpoint(): string {
    return '/Project';
  }

  ensureConstructor(item: Project): Project {
    return new Project(item);
  }

  constructor(protected http: HttpClient) {
    super(http);
  }

}
