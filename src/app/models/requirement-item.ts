import {Item} from 'models/item';

export class RequirementItem {

  id: number;
  item_id: number;
  item: Item;
  constructor(params: Partial<RequirementItem> = {}) {

    let {
      id = null,
      item_id = null,
      item = null,
    } = params;

    this.id = id;
    this.item_id = item_id;
    this.item = item;
  }
}
