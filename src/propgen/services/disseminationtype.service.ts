import {Injectable} from '@angular/core';
import {BackendService} from './backend.service';
import {DisseminationType} from '../model/DisseminationType';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class DisseminationtypeService extends BackendService<DisseminationType> {
  protected getEndpoint(): string {
    return '/DisseminationTypes';
  }

  ensureConstructor(item: DisseminationType): DisseminationType {
    return new DisseminationType(item);
  }
  constructor(protected http: HttpClient) {
    super(http);
  }
}
