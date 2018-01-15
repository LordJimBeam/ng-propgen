import {Injectable} from '@angular/core';
import {BackendService} from './backend.service';
import {PartnerType} from '../model/PartnerType';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class PartnertypeService extends BackendService<PartnerType> {
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
