import {RESTModelInterface} from './RESTModelInterface';

export class PartnerType implements RESTModelInterface<PartnerType> {
  constructor(
    public id: number = 0,
    public shortname: string = '',
    public description: string = ''
  ) {}
}
