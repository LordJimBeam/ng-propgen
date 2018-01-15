import {ModelProperty} from '../modelcreator/model.property';
import {PartnerType} from './PartnerType';
import {StringModelProperty} from '../modelcreator/string.model.property';
import {ForeignKeyModelProperty} from '../modelcreator/foreign.model.property';
import {PartnertypeService} from '../services/partnertype.service';
import {MarkdownModelProperty} from '../modelcreator/markdown.model.property';
import {NumberModelProperty} from '../modelcreator/number.model.property';
import {SortableEntity} from './SortableEntity';
import {AutogeneratableModel} from './AutogeneratableModel';

export class Partner extends AutogeneratableModel {
  protected static _properties: ModelProperty[] = [
    new StringModelProperty({
      name: 'partnername',
      maxLength: 255
    }),
    new StringModelProperty({
      name: 'shortname',
      maxLength: 20
    }),
    new ForeignKeyModelProperty({
      name: 'partnertype',
      type: PartnerType,
      service: PartnertypeService
    }),
    new StringModelProperty({
      name: 'pic',
      maxLength: 16,
      verboseName: 'PIC',
      helpText: 'Participant Identification Code',
      defaultValue: ''
    }),
    new MarkdownModelProperty({
      name: 'description',
      verboseName: 'Partner description in general',
      helpText: 'General description text, will appear before the subsections defined below.\n' +
        'Typically empty if you fill in the following sections.'
    }),
    new MarkdownModelProperty({
      name: 'organization',
      verboseName: 'Organization',
      helpText: 'a description of the legal entity and its main tasks,\n' +
        'with an explanation of how its profile matches the tasks in the proposal'
    }),
    new MarkdownModelProperty({
      name: 'individuals',
      verboseName: 'Individual researchers',
      helpText: 'CV or description of key personnel'
    }),
    new MarkdownModelProperty({
      name: 'partnerpublications',
      verboseName: 'Relevant publications, products and/or services',
      helpText: 'Up to 5 relevant publications, products, services'
    }),
    new MarkdownModelProperty({
      name: 'partnerprojects',
      verboseName: 'Previous projects',
      helpText: 'Up to 5 previous projects or activities, relevant to the proposal'
    }),
    new MarkdownModelProperty({
      name: 'infrastructure',
      verboseName: 'Significant infrastructure',
      helpText: 'Significant infrastructure and/or major technical equipment,\n' +
      'relevant to the project'
    }),
    new StringModelProperty({
      name: 'country',
      maxLength: 3
    }),
    new NumberModelProperty({
      name: 'PMcost',
      maxDigits: 8,
      decimalPlaces: 2,
      verboseName: 'Person month cost',
      helpText: 'This relates to the Direct Personnel Cost (Col. A) via the number of personmonths',
      defaultValue: 0
    }),
    new NumberModelProperty({
      name: 'reimbursement_rate',
      maxDigits: 5,
      decimalPlaces: 2,
      verboseName: 'Reimbursement rate',
      helpText: 'Make sure the reimbursement rate is consistent with the partner type'
    }),
    new NumberModelProperty({
      name: '_other_direct_cost',
      maxDigits: 10,
      decimalPlaces: 2,
      verboseName: 'Other direct cost',
      helpText: 'Corresponds to Col. B. If negative, the value is computed from other fields!',
      defaultValue: -1
    }),
    new MarkdownModelProperty({
      name: 'other_direct_cost_explanation',
      verboseName: 'Explanation for other direct cost',
      helpText: 'Provide explanation for other direct cost if they exceed 15% of the personnel cost (as per guidelines).'
    }),
    new NumberModelProperty({
      name: 'subcontract_cost',
      maxDigits: 10,
      decimalPlaces: 2,
      verboseName: 'Subcontracting cost',
      helpText: 'Total cost of all subcontracting done by this partner',
      defaultValue: 0
    }),
    new MarkdownModelProperty({
      name: 'subcontract_cost_explanation',
      verboseName: 'Explanation for subcontracts',
      helpText: 'Usually, explanation for subcontracting is necessary'
    }),
    new NumberModelProperty({
      name: 'financial_support_3rd',
      maxDigits: 10,
      decimalPlaces: 2,
      verboseName: 'Fincancial support for 3rd parties',
      defaultValue: 0
    }),
    new MarkdownModelProperty({
      name: 'financial_support_3rd_explanation',
      verboseName: 'Explanation of financial support to 3rd party',
      helpText: 'Provide explanation'
    }),
    new NumberModelProperty({
      name: 'inkind_contributions',
      maxDigits: 10,
      decimalPlaces: 2,
      verboseName: 'In-kind contributions',
      defaultValue: 0
    }),
    new MarkdownModelProperty({
      name: 'inkind_contributions_explanations',
      verboseName: 'Explanation of in-kind contributions'
    }),
    new NumberModelProperty({
      name: 'special_uni_cost',
      maxDigits: 10,
      decimalPlaces: 2,
      verboseName: 'Special unit cost',
      defaultValue: 0
    }),
    new MarkdownModelProperty({
      name: 'special_uni_cost_explanation',
      verboseName: 'Explanation of special unit cost'
    }),
    new NumberModelProperty({
      name: '_requested_contribution',
      maxDigits: 10,
      decimalPlaces: 10,
      verboseName: 'Requested contribution',
      helpText: 'Default negative value means requested contribution equals maximum contribution.\n' +
        'Only fill in this field if you want to request less money than the maximum\n' +
        'allows you to do. This is usually not recommended.'
    })
  ];
  public getProperties() {
    return Partner._properties;
  }

  public toListItem(): SortableEntity {
    return new SortableEntity(this.id, this['shortname']);
  }
}
