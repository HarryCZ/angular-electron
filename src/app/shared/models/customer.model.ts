import {NominalCount} from "./nominal-count.model";

export class Customer {
  name: string;
  account: string;
  invoiced: number[];
  margin: number[];
  bonus: number;
  nominalArr: NominalCount[];

  constructor() {};

  getInvoicedTotal() {
    let total: number = 0;
    this.invoiced.forEach((n) => total += n);
    return total;
  }

  getMarginTotal() {
    let total: number = 0;
    this.margin.forEach((n) => total += n);
    if (total > 0) return total / this.margin.length;
    else return 0;
  }

  getBonus() {
    let bonus: number = 0;
    let total: number = this.getInvoicedTotal();
    let margin: number = this.getMarginTotal();
    if (total >= 2500 ) {
      if (margin > 40) bonus = Math.ceil((total * 0.04) / 100) * 100;
      else if (margin > 35) {
        let b: number = (total * 0.04) / 100;
        if ((Math.ceil(b) - b) > 0.2) bonus = Math.floor(b) * 100;
        else bonus = Math.ceil(b) * 100;
      } else if (margin > 28) {
        let b: number = (total * 0.03) / 100;
        if ((Math.ceil(b) - b) > 0.2) bonus = Math.floor(b) * 100;
        else bonus = Math.ceil(b) * 100;
      }
    }
    return bonus;
  }

  denominate(nominals: number[]) {
    let restAmount: number = this.bonus;
    let arr: NominalCount[] = [];
    nominals.sort((a,b) => b - a);
    nominals.forEach(function (nominal:number) {
      let obj: NominalCount = new NominalCount();
      obj.nominal = nominal;
      obj.count = Math.floor(restAmount / nominal);
      arr.push(obj);
      restAmount = restAmount % nominal;
    });
    return arr;
  }
}
