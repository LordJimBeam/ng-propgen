import {Injectable} from '@angular/core';
import {Setting} from '../model/Setting';
import {HttpClient} from '@angular/common/http';
import {VersionedBackendService} from './versioned-backend.service';

@Injectable()
export class SettingService extends VersionedBackendService<Setting> {
  protected getEndpoint(): string {
    return '/Setting';
  }

  ensureConstructor(item: Setting): Setting {
    return new Setting(item);
  }

  constructor(protected http: HttpClient) {
    super(http);
  }
}
