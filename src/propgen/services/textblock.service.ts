import {BackendService} from './backend.service';
import {Textblock} from '../model/Textblock';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable()
export class TextblockService extends BackendService<Textblock> {
  protected getEndpoint(): string {
    return '/Textblock';
  }

  ensureConstructor(item: Textblock): Textblock {
    return new Textblock(item);
  }
  constructor(protected http: HttpClient) {
    super(http);
  }
}
