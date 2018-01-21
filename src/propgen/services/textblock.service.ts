import {Textblock} from '../model/Textblock';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {VersionedBackendService} from './versioned-backend.service';

@Injectable()
export class TextblockService extends VersionedBackendService<Textblock> {
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
