import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {


  breadcrumbs: object[] = [
    {caption: "Nastavení", link: "/dashboard"},
    {caption: "Import dat", link: "/data-import"},
    {caption: "Validace dat", link: "/data-verify"},
    {caption: "Výsledek", link: "/result"}
  ];

  timePeriod: number = 1;
  setTimePeriod(tp: number) {
    this.timePeriod = tp;
  }

  separator: string = ";";
  setSeparator(s: string) {
    this.separator = s;
  }

  availableNominal: number[] = [100,200,500,1000];

  customersToGetBonus: string[] = [];
  clearCustomers() { this.customersToGetBonus = [] }
  addCustomerToList(c: string) { this.customersToGetBonus.push(c) }
  isCustomerListed(c: string) {
    if (c.length > 0) return this.customersToGetBonus.some((s:string) => s.toLocaleUpperCase().includes(c.toLocaleUpperCase()));
    else return false;
  }

  constructor() { }
}
