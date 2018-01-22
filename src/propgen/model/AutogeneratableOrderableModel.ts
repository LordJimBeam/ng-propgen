import {AutogeneratableModel} from './AutogeneratableModel';

export abstract class AutogeneratableOrderableModel extends AutogeneratableModel {
  public order: number;
  public constructor(data: Object = {}) {
    super(data);
    if('order' in data) {
      this.order = data['order'];
    }
  }
}
