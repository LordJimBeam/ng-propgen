import {RESTModelInterface} from './RESTModelInterface';
import {ModelProperty} from '../modelcreator/model.property';
import {PartnerType} from './PartnerType';
import {StringModelProperty} from '../modelcreator/string.model.property';
import {MarkdownModelProperty} from '../modelcreator/markdown.model.property';
import {ForeignKeyModelProperty} from '../modelcreator/foreign.model.property';
import {Partner} from './Partner';
import {PartnerService} from '../services/partner.service';
import {SortableEntity} from './SortableEntity';

export class Workpackage implements RESTModelInterface<Workpackage> {
  public properties: ModelProperty[] = [
    new StringModelProperty({
      name: 'title',
      maxLength: 255
    }),
    new StringModelProperty({
      name: 'tag',
      maxLength: 20
    }),
    new MarkdownModelProperty({
      name: 'objectives'
    }),
    new MarkdownModelProperty({
      name: 'description'
    }),
    new StringModelProperty({
      name: 'type',
      verboseName: 'WP Type (RTD, MGMT, ...)',
      helpText: 'Type of the WP, according to predefined EU list',
      maxLength: 10,
      defaultValue: 'RTD'
    }),
    new ForeignKeyModelProperty({
      name: 'lead',
      type: Partner,
      service: PartnerService
    })
  ];
  public id: number = 0;
  public title: string = '';
  public tag: string = '';
  public type: string = 'RTD';
  public lead: number = 0;
  public objectives: string = '';
  public description: string = '';
  constructor(init?: Partial<PartnerType>) {
    Object.assign(this, init);
  }
  public toListItem(): SortableEntity {
    return new SortableEntity(this.id, this.title);
  }
}
