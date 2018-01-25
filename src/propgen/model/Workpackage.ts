import {ModelProperty} from '../modelcreator/base/model.property';
import {StringModelProperty} from '../modelcreator/string.model.property';
import {MarkdownModelProperty} from '../modelcreator/markdown.model.property';
import {ForeignKeyModelProperty} from '../modelcreator/foreign-single.model.property';
import {Partner} from './Partner';
import {PartnerService} from '../services/partner.service';
import {AutogeneratableOrderableModel} from './AutogeneratableOrderableModel';
import {Autogeneratable} from '../decorators/autogeneratable.decorator';
import {RESTModelInterface} from './RESTModelInterface';
import {AutogeneratableModel} from './AutogeneratableModel';


@Autogeneratable({
  backendPath: '/Workpackage',
  detailRoute: 'workpackage/:id',
  detailTitle: 'Workpackage',
  listRoute: 'workpackages',
  listTitle: 'Workpackages',
  orderable: true,
  hasVersioning: true
},
{
  title: {
    type: StringModelProperty,
    typeSpecificData: {
      maxLength: 255
    }
  }
  ,
  tag: {
    type: StringModelProperty,
    typeSpecificData: {
      maxLength: 20
    }
  }
  ,
  objectives: {
    type: MarkdownModelProperty,
  }
  ,
  description: {
    type: MarkdownModelProperty,
  }
  ,
  type: {
    type: StringModelProperty,
    verboseName: 'WP Type (RTD, MGMT, ...)',
    helpText: 'Type of the WP, according to predefined EU list',
    defaultValue: 'RTD',
    typeSpecificData: {
      maxLength: 10
    }
  }
  ,
  lead: {
    type: ForeignKeyModelProperty,
    typeSpecificData: {
      type: Partner
    }
  }
})
export class Workpackage extends AutogeneratableModel {
  getProperties(): ModelProperty[] {
    return this['properties']();
  }


}
