import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Partner} from '../model/Partner';
import {VersionedBackendService} from './versioned-backend.service';

@Injectable()
export class PartnerService extends VersionedBackendService<Partner> {
  constructor(protected http: HttpClient) {
    super(http);
  }

  protected getEndpoint(): string {
    return '/Partner';
  }

  public ensureConstructor(item: Partner): Partner {
    return new Partner(item);
  }

}
