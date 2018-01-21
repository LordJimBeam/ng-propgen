import {BackendService} from './backend.service';
import {RESTModelInterface} from '../model/RESTModelInterface';
import {Version} from '../model/Version';

export abstract class VersionedBackendService<T extends RESTModelInterface> extends BackendService<T> {
  public getVersions(id: number): Promise<Array<Version<T>>> {
    return new Promise((resolve, reject) => {
      this.http.get<any>(this.baseUrl + this.getEndpoint() + '/' + id + '/Version/').subscribe((data) => {
        resolve(data.versions.map((d) => new Version(d)));
      }, (error) => {
        reject(error);
      });
    });
  }
  public getVersion(id: number, versionId: number): Promise<Version<T>> {
    return new Promise((resolve, reject) => {
      this.http.get<any>(this.baseUrl + this.getEndpoint() + '/' + id + '/Version/' + versionId + '/').subscribe((data) => {
        resolve(new Version(data.version));
      }, (error) => {
        reject(error);
      });
    });
  }
}
