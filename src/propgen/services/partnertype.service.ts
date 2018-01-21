import {Injectable} from '@angular/core';
import {PartnerType} from '../model/PartnerType';
import {HttpClient} from '@angular/common/http';
import {VersionedBackendService} from './versioned-backend.service';

@Injectable()
export class PartnertypeService extends VersionedBackendService<PartnerType> {
  constructor(protected http: HttpClient) {
    super(http);
  }

  protected getEndpoint(): string {
    return '/Partnertype';
  }

  public ensureConstructor(item: PartnerType): PartnerType {
    return new PartnerType(item);
  }

}
