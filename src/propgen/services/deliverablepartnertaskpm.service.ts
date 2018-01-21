import {Injectable} from '@angular/core';
import {DeliverablePartnerTaskPM} from '../model/DeliverablePartnerTaskPM';
import {HttpClient} from '@angular/common/http';
import {VersionedBackendService} from './versioned-backend.service';

@Injectable()
export class DeliverablePartnerTaskPMService extends VersionedBackendService<DeliverablePartnerTaskPM> {
  protected getEndpoint(): string {
    return '/DeliverablePartnerTaskPM';
  }
  ensureConstructor(item: DeliverablePartnerTaskPM): DeliverablePartnerTaskPM {
    return new DeliverablePartnerTaskPM(item);
  }
  constructor(protected http: HttpClient) {
    super(http);
  }
}
