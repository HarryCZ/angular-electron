import {CustomerBonus} from "./customer-bonus";
import {NominalCount} from "./nominal-count.model";

export class AccountBonuses {
  name: string;
  customer: CustomerBonus[];
  totalBonuses: number;
  totalDenomination: NominalCount[];
  constructor() {}
}
