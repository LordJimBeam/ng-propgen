import {ModelPropertyType} from '../modelcreator/base/model.property.type';
import {AutogeneratedRoute, RouteMode, RouteRegistry} from '../components/catch-all/catch-all.component';
import {ModelFormComponent} from '../modelcreator/formcomponents/base/model.form.component';
import {Type} from '@angular/core';

export type AutogeneratableSettings = {
  backendPath: string;
  routes: AutogeneratedRoute[];
  orderable?: boolean;
  hasVersioning?: boolean;
  component?: Type<ModelFormComponent>;
  forbidDeletion?: boolean;
}
export type AutogeneratableProperties = {
  [name: string]: ModelPropertyType
}

export function Autogeneratable(generatorProperties: AutogeneratableSettings, properties: AutogeneratableProperties) {
  let propInstances = [];
  for(let key in properties) {
    properties[key].name = key;
    propInstances.push(properties[key]);
  }
  if(generatorProperties.hasVersioning) {
    let detailRoutes = generatorProperties.routes.filter((r) => r.mode == RouteMode.Detail);
    if(detailRoutes.length > 0) {
      if (detailRoutes.length > 1) {
        console.warn('Found ambiguous detail route definition, picking', detailRoutes[0]);
      }

      generatorProperties.routes.push({
        path: detailRoutes[0].path + '/versions',
        mode: RouteMode.Versionlist,
        data: detailRoutes[0].data
      });
      generatorProperties.routes.push({
        path: detailRoutes[0].path + '/version/:versionId',
        mode: RouteMode.Version,
        data: detailRoutes[0].data
      });
    }
    else {
      console.warn(generatorProperties, 'Cannot find detail route definition, please set hasVersioning to false and provide your own version routes if necessary');
    }
  }
  return function(constructor) {
    RouteRegistry.registerRoutes(generatorProperties.routes, constructor);
    if(generatorProperties.orderable) {
      constructor.prototype.order = 0;
    }
    constructor.prototype.getAutoGeneratorSettings = () => generatorProperties;
    constructor.prototype.getProperties = () => properties;
    constructor.prototype._auto = {
      settings: generatorProperties,
      properties: properties
    }
  }
}
