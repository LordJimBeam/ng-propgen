import {Injectable} from '@angular/core';
import {BackendService} from './backend.service';
import {Template} from '../model/Template';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class TemplateService extends BackendService<Template> {
  protected getEndpoint(): string {
    return '/Template';
  }

  ensureConstructor(item: Template): Template {
    return new Template(item);
  }

  constructor(protected http: HttpClient) {
    super(http);
  }
}
