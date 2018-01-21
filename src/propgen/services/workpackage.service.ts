import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Workpackage} from '../model/Workpackage';
import {VersionedBackendService} from './versioned-backend.service';

@Injectable()
export class WorkpackageService extends VersionedBackendService<Workpackage> {
  protected getEndpoint(): string {
    return '/Workpackage';
  }

  public ensureConstructor(item: Workpackage): Workpackage {
    return new Workpackage(item);
  }
  constructor(protected http: HttpClient) {
    super(http);
  }



}
