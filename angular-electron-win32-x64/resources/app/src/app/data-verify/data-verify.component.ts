import { Component, OnInit } from '@angular/core';
import {DataService} from "../shared/services/data.service";
import {CustomerService} from "../shared/services/customer.service";
import {Customer} from "../shared/models/customer.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-data-verify',
  templateUrl: './data-verify.component.html',
  styleUrls: ['./data-verify.component.css']
})
export class DataVerifyComponent implements OnInit {

  labelName: string = "Název";
  labelAccount: string = "O.Z.";
  labelInvoiced: string = "Fakturace";
  labelMargin: string = "Marže";
  labelBonus: string = "Bonus";
  countBonuses: string = "Spočítat";
  customers: Customer[];
  editing: number = null;
  constructor(private dataService: DataService,
              private customerService: CustomerService,
              private router: Router) { }

  ngOnInit() {
    if(this.customerService.customers.length == 0) this.router.navigate([""]);
    this.customers = this.customerService.customers;
  }

  editBonus(i: number) {
    this.editing = i;
  }
  saveEdit(c: Customer) {
    this.editing = null;
    c.denominate(this.dataService.availableNominal);
  }
  validationComplete() {
    this.router.navigate(['result']);
  }
}
