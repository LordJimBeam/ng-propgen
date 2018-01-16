import {Injectable} from '@angular/core';
import {BackendService} from './backend.service';
import {DeliverablePartnerTaskPM} from '../model/DeliverablePartnerTaskPM';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class DeliverablePartnerTaskPMService extends BackendService<DeliverablePartnerTaskPM> {
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
