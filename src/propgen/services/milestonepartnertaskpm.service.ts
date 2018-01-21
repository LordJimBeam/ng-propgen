import {Injectable} from '@angular/core';
import {MilestonePartnerTaskPM} from '../model/MilestonePartnerTaskPM';
import {HttpClient} from '@angular/common/http';
import {VersionedBackendService} from './versioned-backend.service';

@Injectable()
export class MilestonePartnerTaskPMService extends VersionedBackendService<MilestonePartnerTaskPM> {
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
