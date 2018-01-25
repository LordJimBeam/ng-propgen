import {Component, OnDestroy} from '@angular/core';
import {ActivatedRoute, UrlSegment} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';



export class RouteRegistry {
  private static listRoutes = {};
  private static detailRoutes = {};
  public static registerRoutes(detailRoute: string, listRoute: string, constructor) {
    if(detailRoute in this.detailRoutes) {
      console.warn('Trying to register path ', detailRoute, ' multiple times');
    }
    else {
      this.detailRoutes[detailRoute] = constructor;
    }
    if(listRoute in this.listRoutes) {
      console.warn('Trying to register path ', listRoute, ' multiple times');
    }
    else {
      this.listRoutes[listRoute] = constructor;
    }
  }
  public static matchRoute(route: UrlSegment[]): {constructor: any, params?: any} {
    console.log('Matching ', route);
    const routeString = route.join('');
    if(routeString in this.listRoutes) {
      return {
        constructor: this.listRoutes[routeString]
      }
    }
    for(let key in this.detailRoutes) {
      let detailSegments = key.split('/');
      let segmentIndex = 0;
      if(detailSegments.length !== route.length) {
        continue;
      }
      let routeParams = {};
      while(segmentIndex < detailSegments.length && segmentIndex < route.length) {
        if(detailSegments[segmentIndex].startsWith(':')) {
          routeParams[detailSegments[segmentIndex].substr(1)] = route[segmentIndex].path;
        }
        else {
          if(detailSegments[segmentIndex] !== route[segmentIndex].path) {
            break;
          }
        }
        segmentIndex++;
      }
      if(segmentIndex === detailSegments.length) {
        // everything matches up, success
        return {
          constructor: this.detailRoutes[key],
          params: routeParams
        }
      }
    }
    return {
      constructor: null
    }
  }
}

@Component({
  selector: 'propgen-catch-all',
  template:
  '<ng-container [ngSwitch]="mode">' +
  '  <propgen-automatic-model-form-list [type]="type" *ngSwitchCase="\'list\'"></propgen-automatic-model-form-list>' +
  '  <propgen-automatic-model-form [type]="type" [id]="id" *ngSwitchCase="\'detail\'"></propgen-automatic-model-form>' +
  '  <div *ngSwitchDefault>This is not the page you are looking for</div>' +
  '</ng-container>'
})
export class CatchAllComponent implements OnDestroy {
  public mode: string = "404";
  public type: any;
  public id: any;
  private subscription: Subscription;
  constructor(activatedRoute: ActivatedRoute) {
    this.subscription = activatedRoute.url.subscribe((segments) => {
      let route = RouteRegistry.matchRoute(segments);
      console.log('Matched to', route);
      if(route.constructor === null) {
        this.mode = '404';
      }
      else {
        this.type = route.constructor;
        if(route.params && route.params.id) {
          this.id = route.params.id;
          this.mode = 'detail';
        }
        else {
          this.mode = 'list';
        }
      }
      console.log('Mode', this.mode);
    });

  }
  ngOnDestroy() {
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
