import { Component, OnInit } from '@angular/core';
import {DataService} from "../shared/services/data.service";
import {NominalCount} from "../shared/models/nominal-count.model";
import {Customer} from "../shared/models/customer.model";
import {CustomerService} from "../shared/services/customer.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-data-import',
  templateUrl: './data-import.component.html',
  styleUrls: ['./data-import.component.css']
})
export class DataImportComponent implements OnInit {
  msgBoxMessage: string = '';
  msgBoxLevel: string = '';

  labelBonusData: string = "Podklady pro bonusy: ";
  labelCustomerList: string = "Seznam zákazníků: ";


  constructor(private dataService: DataService, private customerService: CustomerService, private router: Router) { }

  ngOnInit() {
    console.log(this.dataService.timePeriod + this.dataService.separator);
  }

  dataFile: any;
  dataFileChanged(e) {
    this.dataFile = e.target.files[0];
  }

  customerListFile: any;
  customerListFileChanged(e) {
    this.customerListFile = e.target.files[0];
  }

  uploadDocuments() {
    this.readCustomerListFile();
  }
  readCustomerListFile() {
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      console.log(fileReader.result);
      this.parseCustomerList(fileReader.result.toString().split('\n'));
      this.readDataFile();
    };
    fileReader.readAsText(this.customerListFile,'UTF-8');
  }

  parseCustomerList(data: string[]) {
    this.dataService.clearCustomers();
    data.forEach((d) => {this.dataService.addCustomerToList(d)});
    console.log(this.dataService.customersToGetBonus);
  }

  readDataFile() {
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      console.log(fileReader.result);
      this.parseData(fileReader.result.toString().split('\n').splice(1));
      this.router.navigate(['data-verify']);
    };
    fileReader.readAsText(this.dataFile,'UTF-8');
  }

  parseData(data: string[]) {
    try {
      this.customerService.clearCustomers();
      this.customerService.clearAccounts();
      let actualAccount = '';
      console.log(data);
      let i = 0;
      while ( i < data.length ) {
        let line1Arr: string[] = data[i].split(this.dataService.separator);
        if (line1Arr[0].length > 0) {
          actualAccount = line1Arr[0];
          this.customerService.addAccount(actualAccount);
        }
        if (line1Arr[1]) {
          if (this.dataService.isCustomerListed(line1Arr[1])) {
            line1Arr.splice(line1Arr.length - 1);
            let line2Arr: string[] = data[i+1].split(this.dataService.separator);
            line2Arr.splice(line2Arr.length - 1);
            let customer: Customer = new Customer();

            customer.account = actualAccount;
            customer.name = line1Arr[1];
            customer.invoiced = [];
            line1Arr.splice(line1Arr.length - this.dataService.timePeriod).forEach((invoice) => {
              if (invoice.length > 0) customer.invoiced.push(parseInt(invoice.replace(" ","")))
            });
            customer.margin = [];
            line2Arr.splice(line2Arr.length - this.dataService.timePeriod).forEach((margin) => {
              if ((margin.length > 0) && (margin != "#DIV/0!")) customer.margin.push(parseFloat(margin.replace(',','.')))
            });
            customer.bonus = customer.getBonus();
            customer.nominalArr = customer.denominate(this.dataService.availableNominal);
            this.customerService.addCustomer(customer);
          }
        }
        i += 2;
      }
      console.log(JSON.stringify(this.customerService.customers));
    } catch (e) {
      console.log(e);
      this.msgBoxLevel = 'error';
      this.msgBoxMessage = 'Data nelze načíst';
    }

  }

}



