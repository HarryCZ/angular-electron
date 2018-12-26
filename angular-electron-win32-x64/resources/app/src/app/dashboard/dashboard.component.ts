import { Component, OnInit } from '@angular/core';
import { DataService } from "../shared/services/data.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  labelsPeriod: string[] = ["Měsíční","Čtvrdletní","Pololetní"];
  timePeriod: string;
  separator: string;

  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit() {
    this.timePeriod = this.dataService.timePeriod.toString();
    this.separator = this.dataService.separator;
  }

  startImport() {
    this.dataService.setTimePeriod(parseInt(this.timePeriod));
    this.dataService.setSeparator(this.separator);
    console.log(this.separator);
    this.router.navigate(['data-import']);
  }
}
