import {RESTModelInterface} from './RESTModelInterface';

export class Workpackage implements RESTModelInterface<Workpackage> {
  constructor(
    public id: number = 0,
    public title: string = '',
    public tag: string = '',
    public type: string = 'RTD',
    public lead: number = 0,
    public objectives: string = '',
    public description: string = ''
  ) {}
}
