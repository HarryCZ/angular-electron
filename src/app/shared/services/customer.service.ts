import { Injectable } from '@angular/core';
import {Customer} from "../models/customer.model";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  customers: Customer[] = [];

  addCustomer(customer: Customer): void {
    this.customers.push(customer);
  }

  clearCustomers(): void {
    this.customers = [];
  }

  accounts: string[] = [];

  addAccount(account: string):void {
    this.accounts.push(account);
  }

  clearAccounts():void {
    this.accounts = [];
  }

  constructor() { }
}
