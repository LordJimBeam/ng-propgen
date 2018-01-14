import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Workpackage} from '../model/Workpackage';
import {BackendService} from './backend.service';

@Injectable()
export class WorkpackageService extends BackendService<Workpackage> {
  protected getEndpoint(): string {
    return '/Workpackage';
  }

  protected ensureConstructor(item: Workpackage): Workpackage {
    return new Workpackage(item);
  }
  constructor(protected http: HttpClient) {
    super(http);
  }



}
