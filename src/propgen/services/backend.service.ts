import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import {RESTModelInterface} from '../model/RESTModelInterface';
import {RESTSingleResponse} from '../model/RESTSingleResponse';
import {RESTListResponse} from '../model/RESTListResponse';
import {hasOwnProperty} from 'tslint/lib/utils';

const baseUrl = 'http://localhost:8000';

export abstract class BackendService<T extends RESTModelInterface<T>> {
  constructor(protected http: HttpClient) {
    this.cacheValidUntil = 0;
  }
  private _cachedItems: BehaviorSubject<T[]> = new BehaviorSubject([]);
  private cacheValidUntil: number;
  private _inProgress: boolean;
  private get cachedItems(): T[] {
    return this._cachedItems.getValue();
  }
  private set cachedItems(items: T[]) {
    console.log('setting cache');
    console.log(items);
    this._cachedItems.next(items);
  }
  protected get cacheValid(): boolean {
    return this.cacheValidUntil > Date.now();
  }
  public get baseUrl(): string {
    return baseUrl;
  }
  public resetCache(): void {
    this.cacheValidUntil = 0;
    this._cachedItems = new BehaviorSubject([]);
  }
  protected updateCache(item: T) {
    const index = this.cachedItems.findIndex(i => item.id === i.id);
    if (index > -1) {
      this.cachedItems[index] = item;
    } else {
      this.cachedItems.push(item);
    }
    this._cachedItems.next(this.cachedItems);
  }
  protected removeFromCache(item: T) {
    const index = this.cachedItems.findIndex(i => i.id === item.id);
    if (index > -1) {
      const cache = this.cachedItems;
      cache.splice(index, 1);
      this.cachedItems = cache;
      this._cachedItems.next(this.cachedItems);
    } else {
      console.warn('deleted ' + this.getEndpoint() + '/' + item.id + ' but could not find it in cache');
    }
  }
  public get(id: number): Promise<T> {
    return new Promise((resolve, reject) => {
      if (this.cacheValid) {
        const item = this.cachedItems.find(i => i.id === id);
        if (item) {
          resolve(item);
          return;
        }
      }
      this.internalRetrieveItem(id).subscribe(data => {
        const item = this.ensureConstructor(data.sm);
        resolve(item);
        this.updateCache(item);
      }, (error) => {
        reject(error);
      });
    });
  }

  public getAll(): Observable<T[]> {
    if (!this.cacheValid && !this._inProgress) {
      this._inProgress = true;
      this.internalRetrieveAllItems().subscribe(data => {
        this.cacheValidUntil = Date.now() + (1000 * 600);
        this._inProgress = false;
        this.cachedItems = data.object_list.map(d => this.ensureConstructor(d));
        console.log(this.cachedItems);
      }, (error) => {
        this._inProgress = false;
        this._cachedItems.error(error);
      });
    }
    return new Observable(fn => this._cachedItems.subscribe(fn));
  }
  public save(item: T): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (!item) {
        reject();
      }
      item = this.ensureConstructor(item);
      const oldItem = this.cachedItems.find(f => f.id === item.id);
      if (oldItem) {
        this.internalUpdateItem(item).subscribe(() => {
          this.updateCache(item);
          resolve();
        }, (error) => {
          console.log(error);
          reject(error);
        });
      } else {
        if(hasOwnProperty(item, 'id')) {
          delete item['id'];
        }
        this.internalCreateItem(item).subscribe((result) => {
          this.updateCache(this.ensureConstructor(result));
          resolve();
        }, (error) => reject(error));
      }
    });
  }
  public delete(item: T): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (!item) {
        reject();
      }
      this.internalDeleteItem(item.id).subscribe(() => {
        this.removeFromCache(item);
        resolve();
      }, (error) => {
        reject(error);
      });
    });
  }
  protected abstract getEndpoint(): string;
  protected abstract ensureConstructor(item: T): T;
  protected internalCreateItem(item: T): Observable<any> {
    return this.http.post(baseUrl + this.getEndpoint() + '/', item);
  }
  protected internalRetrieveItem(id: number): Observable<RESTSingleResponse<T>> {
    return this.http.get<RESTSingleResponse<T>>(baseUrl + this.getEndpoint() + '/' + id + '/');
  }
  protected internalRetrieveAllItems(): Observable<RESTListResponse<T>> {
    return this.http.get<RESTListResponse<T>>(baseUrl + this.getEndpoint() + '/');
  }
  protected internalUpdateItem(item: RESTModelInterface<T>): Observable<any> {
    return this.http.put(baseUrl + this.getEndpoint() + '/' + item.id + '/', item);
  }
  protected internalDeleteItem(id: number): Observable<any> {
    return this.http.delete(baseUrl + this.getEndpoint() + '/' + id + '/');
  }
}
