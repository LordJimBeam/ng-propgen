import {Injectable} from '@angular/core';
import {BackendService} from './backend.service';
import {Setting} from '../model/Setting';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class SettingService extends BackendService<Setting> {
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
