import {Component, Input, OnInit} from '@angular/core';
import {DataService} from "../shared/services/data.service";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  @Input() step: number;

  breadcrumbs: object[];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.breadcrumbs = this.dataService.breadcrumbs;
  }

}
