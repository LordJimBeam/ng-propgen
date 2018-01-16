import {Injectable} from '@angular/core';
import {MilestonePartnerTaskPM} from '../model/MilestonePartnerTaskPM';
import {BackendService} from './backend.service';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class MilestonePartnerTaskPMService extends BackendService<MilestonePartnerTaskPM> {
  protected getEndpoint(): string {
    return '/MilestonePartnerTaskPM';
  }

  ensureConstructor(item: MilestonePartnerTaskPM): MilestonePartnerTaskPM {
    return new MilestonePartnerTaskPM(item);
  }

  constructor(protected http: HttpClient) {
    super(http);
  }
}
