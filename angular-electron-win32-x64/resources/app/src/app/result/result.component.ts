import { Component, OnInit } from '@angular/core';
import {DataService} from "../shared/services/data.service";
import {CustomerService} from "../shared/services/customer.service";
import {Customer} from "../shared/models/customer.model";
import {AccountBonuses} from "../shared/models/account-bonuses";
import {CustomerBonus} from "../shared/models/customer-bonus";
import {NominalCount} from "../shared/models/nominal-count.model";
import {Router} from "@angular/router";
import {saveAs} from "file-saver";

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  labelAccount: string = "OZ";
  labelBonus: string = "Bonus";
  labelTotal: string = "TOTAL"
  labelsNominals: number[];
  customers: object[];
  accounts: string[];
  accountBonuses: AccountBonuses[] = [];
  totalNominals: NominalCount[] = [];
  totalBonus: number = 0;
  constructor(private dataService: DataService, private customerService: CustomerService, private router: Router) { }

  ngOnInit() {
    if(this.customerService.customers.length == 0) this.router.navigate([""]);
    this.customers = this.customerService.customers;
    this.accounts = this.customerService.accounts;
    this.labelsNominals = this.dataService.availableNominal.sort((a,b) => b - a);
    this.getAccounts();
  }

  getAccounts() {
    this.accounts.forEach((account: string, index: number) => {
      let bonus: AccountBonuses = new AccountBonuses();
      bonus.name = account;
      bonus.customer = [];
      bonus.totalBonuses = 0;
      bonus.totalDenomination = [];
      let custs = this.customers.filter((e:Customer) => e.account === account);
      custs.forEach((c:Customer, i:number) => {
        let newCustBonus: CustomerBonus = new CustomerBonus();
        newCustBonus.name = c.name;
        newCustBonus.bonus = c.bonus;
        bonus.totalBonuses += c.bonus;
        newCustBonus.denomination = c.denominate(this.dataService.availableNominal);
        if (bonus.totalDenomination.length > 0) {
          newCustBonus.denomination.forEach((nominal) => {
            bonus.totalDenomination.forEach((nominalTotal) => {
              if (nominal.nominal == nominalTotal.nominal) nominalTotal.count += nominal.count;
            });
          });
        }
        else {
          newCustBonus.denomination.forEach((nominal) => {
            let newNominal = new NominalCount();
            newNominal.nominal = nominal.nominal;
            newNominal.count = nominal.count;
            bonus.totalDenomination.push(newNominal);
          })
        }

        bonus.customer.push(newCustBonus);
      });
      if (bonus.totalDenomination.length > 0) this.accountBonuses.push(bonus);
    });
    console.log(this.accountBonuses);
    this.countTotal();
  }


  countTotal() {
    this.accountBonuses.forEach((account) => {
      this.totalBonus += account.totalBonuses;
      if (this.totalNominals.length > 0) {
        account.totalDenomination.forEach((nominal) => {
          this.totalNominals.forEach((totalNominal) => {
            if (nominal.nominal == totalNominal.nominal) totalNominal.count += nominal.count;
          })
        })
      } else {
        account.totalDenomination.forEach((nominal) => {
          let newNominal = new NominalCount();
          newNominal.nominal = nominal.nominal;
          newNominal.count = nominal.count;
          this.totalNominals.push(newNominal);
        })
      }
    })
  }

  download() {
    let blob:string = '';
    blob += this.labelAccount + this.dataService.separator + this.labelBonus + this.dataService.separator;
    this.labelsNominals.forEach((labelNominal) => blob += labelNominal + this.dataService.separator)
    blob += '\n';
    this.accountBonuses.forEach((bonus) => {
      blob += bonus.name + this.dataService.separator + bonus.totalBonuses + this.dataService.separator;
      bonus.totalDenomination.forEach((nominal) => blob += nominal.count + this.dataService.separator);
      blob += '\n';
    });
    blob += this.labelTotal + this.dataService.separator + this.totalBonus + this.dataService.separator;
    this.totalNominals.forEach((nominal) => blob += nominal.count + this.dataService.separator);
    console.log(blob);
    const f = new Blob([blob], { type: 'text/csv;charset=utf-16' });
    saveAs(f, "bonusy.csv");
  }

  print() {
    let printContents = document.getElementById('result').innerHTML;
    let originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
  }

  new() {
    this.router.navigate(['/dashboard'])
  }
}
