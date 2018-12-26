import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DataImportComponent} from "./data-import/data-import.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {DataVerifyComponent} from "./data-verify/data-verify.component";
import {ResultComponent} from "./result/result.component";

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent},
  { path: 'data-import', component: DataImportComponent},
  { path: 'data-verify', component: DataVerifyComponent},
  { path: 'result', component: ResultComponent},
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
