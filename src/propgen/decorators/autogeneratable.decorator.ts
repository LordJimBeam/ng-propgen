import {ModelPropertyType} from '../modelcreator/base/model.property.type';
import {RouteRegistry} from '../components/catch-all/catch-all.component';

export type AutogeneratableProperties = {
  backendPath: string;
  detailRoute: string;
  detailTitle: string;
  listRoute: string;
  listTitle: string;
  orderable: boolean;
  hasVersioning: boolean;
}

export function Autogeneratable(generatorProperties: AutogeneratableProperties, properties: { [name: string]: ModelPropertyType }) {
  return function(constructor) {
    let propInstances = [];
    for(let key in properties) {
      properties[key].name = key;
      propInstances.push(properties[key]);
    }
    RouteRegistry.registerRoutes(generatorProperties.detailRoute, generatorProperties.listRoute, constructor);
    constructor.prototype._autogeneratable = generatorProperties;
    constructor.prototype._autoproperties = properties;
    constructor.prototype.properties = function() {
      return propInstances.map((i) => {
        let obj = Object.assign({}, i);
        delete obj.type;
        delete obj.typeSpecificData;
        obj = Object.assign(obj, i.typeSpecificData);
        return new i.type(obj);
      });
    };
  }
}
