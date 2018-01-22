import {AutogeneratableModel} from './AutogeneratableModel';
import {ModelProperty} from '../modelcreator/base/model.property';
import {StringModelProperty} from '../modelcreator/string.model.property';
import {ForeignKeyModelProperty} from '../modelcreator/foreign-single.model.property';
import {PartnerService} from '../services/partner.service';
import {Partner} from './Partner';
import {NumberModelProperty} from '../modelcreator/number.model.property';
import {EmailModelProperty} from '../modelcreator/email.model.property';

export class Project extends AutogeneratableModel {
  protected static _properties: ModelProperty[] = [
    new StringModelProperty({
      name: 'title',
      verboseName: 'Project title',
      maxLength: 512
    }),
    new StringModelProperty({
      name: 'shortname',
      verboseName: 'Project short name or acronym',
      maxLength: 128
    }),
    new ForeignKeyModelProperty({
      name: 'lead',
      type: Partner,
      service: PartnerService,
      verboseName: 'Project coordinator (partner)'
    }),
    new NumberModelProperty({
      name: 'duration',
      verboseName: 'Project duration (in month)'
    }),
    new StringModelProperty({
      name: 'projecttype',
      verboseName: 'Project type',
      helpText: 'Project type like STREP, IA, IP, ...',
      maxLength: 64
    }),
    new StringModelProperty({
      name: 'callid',
      verboseName: 'Call identifier',
      helpText: 'EU call ID like ICT FP7-ICT-2012-8',
      maxLength: 30
    }),
    new StringModelProperty({
      name: 'callobjectives',
      verboseName: 'Call objectives',
      helpText: 'Use identifiers or short names from call',
      maxLength: 128
    }),
    new StringModelProperty({
      name: 'coordinatorName',
      verboseName: 'Name of coordinating person',
      maxLength: 128
    }),
    new EmailModelProperty({
      name: 'coordinatorEmail',
      verboseName: 'Email of the coordinating person'
    }),
    new StringModelProperty({
      name: 'coordinatorPhone',
      verboseName: 'Phone/FAX numbere of coordinator',
      maxLength: 128
    })
  ];
  getProperties(): ModelProperty[] {
    return Project._properties;
  }

}
