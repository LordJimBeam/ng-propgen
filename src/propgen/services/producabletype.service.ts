import {Injectable} from '@angular/core';
import {BackendService} from './backend.service';
import {ProducableType} from '../model/ProducableType';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class ProducabletypeService extends BackendService<ProducableType> {
  protected getEndpoint(): string {
    return '/ProducableTypes'
  }

  ensureConstructor(item: ProducableType): ProducableType {
    return new ProducableType(item);
  }
  constructor(protected http: HttpClient) {
    super(http);
  }
}
