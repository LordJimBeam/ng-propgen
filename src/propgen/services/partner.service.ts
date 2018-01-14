import {Injectable} from '@angular/core';
import {BackendService} from './backend.service';
import {PartnerType} from '../model/PartnerType';
import {HttpClient} from '@angular/common/http';
import {Partner} from '../model/Partner';

@Injectable()
export class PartnerService extends BackendService<Partner> {
  constructor(protected http: HttpClient) {
    super(http);
  }

  protected getEndpoint(): string {
    return '/Partner';
  }

  protected ensureConstructor(item: Partner): Partner {
    return new Partner(item);
  }

}
