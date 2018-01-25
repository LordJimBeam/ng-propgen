import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {AutogeneratableModel} from '../model/AutogeneratableModel';
import {Injectable} from '@angular/core';
import {hasOwnProperty} from 'tslint/lib/utils';
import {AutogeneratableOrderableModel} from '../model/AutogeneratableOrderableModel';

const secondsToCacheInvalidation = 60;

@Injectable()
export class DefaultBackendService {
  constructor(protected http: HttpClient) {}

  public static get baseUrl() {
    return 'http://localhost:8091';
  }
  public static pathFromConstructor(constructor) {
    if(!constructor || !constructor.prototype || !constructor.prototype._autogeneratable) {
      console.log(constructor);
    }
    return constructor.prototype._autogeneratable.backendPath;
  }

  private _cachedItems: { [endpoint: string]: BehaviorSubject<AutogeneratableModel[]> } = {};
  private cacheValidUntil: { [endpoint: string]: number } = {};
  private _inProgress: { [endpoint: string]: boolean } = {};
  private getCachedItems(endpoint: string): AutogeneratableModel[] {
    return this._cachedItems[endpoint].getValue();
  }
  private setCachedItems(endpoint: string, items: AutogeneratableModel[]) {
    this._cachedItems[endpoint].next(items);
  }
  protected isCacheValid(endpoint: string): boolean {
    return endpoint in this.cacheValidUntil && this.cacheValidUntil[endpoint] > Date.now();
  }
  protected resetCache(endpoint: string): void {
    this.cacheValidUntil[endpoint] = 0;
    this._cachedItems[endpoint] = new BehaviorSubject([]);
  }
  protected updateCache(endpoint: string, item: AutogeneratableModel) {
    let endpointCache = this.getCachedItems(endpoint);
    const index = endpointCache.findIndex(i => item.id === i.id);
    if (index > -1) {
      endpointCache[index] = item;
    } else {
      endpointCache.push(item);
    }
    this._cachedItems[endpoint].next(endpointCache);
  }
  protected removeFromCache(endpoint: string, item: AutogeneratableModel) {
    let endpointCache = this.getCachedItems(endpoint);
    const index = endpointCache.findIndex(i => i.id === item.id);
    if (index > -1) {
      const cache = this.getCachedItems(endpoint);
      cache.splice(index, 1);
      this.setCachedItems(endpoint, cache);
      this._cachedItems[endpoint].next(this.getCachedItems(endpoint));
    } else {
      console.warn('deleted ' + endpoint + '/' + item.id + ' but could not find it in cache');
    }
  }

  public getAll(constructor): Observable<AutogeneratableModel[]> {
    const endpoint = DefaultBackendService.pathFromConstructor(constructor);
    if(!(endpoint in this._cachedItems)) {
      this.resetCache(endpoint);
    }
    if (!this.isCacheValid(endpoint) && (!(endpoint in this._inProgress) && !this._inProgress[endpoint])) {
      this._inProgress[endpoint] = true;
      this.internalRetrieveAllItems(endpoint).subscribe(data => {
        this._inProgress[endpoint] = false;
        this.setCachedItems(endpoint, data.object_list.map(d => new constructor(d)));
        this.cacheValidUntil[endpoint] = Date.now() + (1000 * secondsToCacheInvalidation);
      }, (error) => {
        this._inProgress[endpoint] = false;
        this._cachedItems[endpoint].error(error);
      });
    }
    return new Observable(fn => this._cachedItems[endpoint].subscribe(fn));
  }
  public get(constructor, id): Promise<AutogeneratableModel> {
    const endpoint = DefaultBackendService.pathFromConstructor(constructor);
    if(!(endpoint in this._cachedItems)) {
      this.resetCache(endpoint);
    }
    return new Promise((resolve, reject) => {
      if (this.isCacheValid(endpoint)) {
        const item = this.getCachedItems(endpoint).find(i => i.id === id);
        if (item) {
          resolve(item);
          return;
        }
      }
      this.internalRetrieveItem(endpoint, id).subscribe(data => {
        const item = new constructor(data.sm);
        resolve(item);
        this.updateCache(endpoint, item);
      }, (error) => {
        reject(error);
      });
    });
  }
  public save(constructor, item: AutogeneratableModel): Promise<void> {
    const endpoint = DefaultBackendService.pathFromConstructor(constructor);
    if(!(endpoint in this._cachedItems)) {
      this.resetCache(endpoint);
    }
    return new Promise<void>((resolve, reject) => {
      if (!item) {
        reject();
        return;
      }
      item = new constructor(item);
      const oldItem = this.getCachedItems(endpoint).find(f => f.id === item.id);
      if (oldItem) {
        this.internalUpdateItem(endpoint, item).subscribe(() => {
          this.updateCache(endpoint, item);
          resolve();
        }, (error) => {
          console.error(error);
          reject(error);
        });
      } else {
        if(hasOwnProperty(item, 'id')) {
          delete item['id'];
        }
        this.internalCreateItem(endpoint, item).subscribe((result) => {
          this.updateCache(endpoint, new constructor(result));
          resolve();
        }, (error) => reject(error));
      }
    });
  }
  public delete(constructor, item: AutogeneratableModel): Promise<void> {
    const endpoint = DefaultBackendService.pathFromConstructor(constructor);
    if(!(endpoint in this._cachedItems)) {
      this.resetCache(endpoint);
    }
    return new Promise<void>((resolve, reject) => {
      if (!item) {
        reject();
        return;
      }
      this.internalDeleteItem(endpoint, item.id).subscribe(() => {
        this.removeFromCache(endpoint, item);
        resolve();
      }, (error) => {
        reject(error);
      });
    });
  }
  public saveOrder(constructor, items: AutogeneratableModel[]): Promise<void> {
    const endpoint = DefaultBackendService.pathFromConstructor(constructor);
    if(!(endpoint in this._cachedItems)) {
      this.resetCache(endpoint);
    }
    return new Promise<void>((resolve, reject) => {
      if(!items) {
        reject();
        return;
      }
      if(items.length === 0) {
        resolve();
        return;
      }
      if(!(items[0] instanceof AutogeneratableOrderableModel)) {
        reject();
        return;
      }
      const patchSet = items.map((d) => {
        return {
          id: d.id,
          order: d['order']
        }
      });
      this.http.patch(DefaultBackendService.baseUrl + endpoint + '/order/', patchSet).subscribe(() => {
        resolve();
      }, (error) => {
        reject(error);
      });
    });
  }
  protected internalCreateItem(path: string, item: AutogeneratableModel): Observable<any> {
    return this.http.post(DefaultBackendService.baseUrl + path + '/', item);
  }
  protected internalRetrieveItem(path: string, id: number): Observable<any> {
    return this.http.get(DefaultBackendService.baseUrl + path + '/' + id + '/');
  }
  protected internalRetrieveAllItems(path: string): Observable<any> {
    return this.http.get(DefaultBackendService.baseUrl + path + '/');
  }
  protected internalUpdateItem(path: string, item: AutogeneratableModel): Observable<any> {
    return this.http.put(DefaultBackendService.baseUrl + path + '/' + item.id + '/', item);
  }
  protected internalDeleteItem(path: string, id: number): Observable<any> {
    return this.http.delete(DefaultBackendService.baseUrl + path + '/' + id + '/');
  }
}
