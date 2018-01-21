import {Project} from '../model/Project';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {VersionedBackendService} from './versioned-backend.service';

@Injectable()
export class ProjectService extends VersionedBackendService<Project> {
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
