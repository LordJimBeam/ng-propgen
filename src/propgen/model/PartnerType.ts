import {StringModelProperty} from '../modelcreator/string.model.property';
import {ModelProperty} from '../modelcreator/base/model.property';
import {SortableEntity} from './SortableEntity';
import {AutogeneratableOrderableModel} from './AutogeneratableOrderableModel';
import {Autogeneratable} from '../decorators/autogeneratable.decorator';

@Autogeneratable({
  backendPath: '/Partnertype',
  detailRoute: 'partnertype',
  detailTitle: 'partner type',
  listRoute: 'partnertypes',
  listTitle: 'partner types',
  orderable: true,
  hasVersioning: true
}, {
  shortname: {
    type: StringModelProperty,
    helpText: "Short form of partner types",
    defaultValue: '',
    typeSpecificData: {
      maxLength: 20
    }
  },
  description: {
    type: StringModelProperty,
    defaultValue: '',
    typeSpecificData: {
      maxLength: 128
    }
  }
})
export class PartnerType extends AutogeneratableOrderableModel {
  public getProperties(): ModelProperty[] {
    return this['properties']();
  }
  toListItem() {
    return new Promise<SortableEntity>((resolve) => {
      resolve(new SortableEntity(this.id, this['shortname'] + ' ' + this['description']));
    });
  }
}
