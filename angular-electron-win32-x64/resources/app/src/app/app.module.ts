import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DataImportComponent } from './data-import/data-import.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {FormsModule} from "@angular/forms";
import { MessageBoxComponent } from './message-box/message-box.component';
import { DataVerifyComponent } from './data-verify/data-verify.component';
import { NavigationComponent } from './navigation/navigation.component';
import { ResultComponent } from './result/result.component';

import { registerLocaleData } from '@angular/common';
import localeCS from '@angular/common/locales/cs';

registerLocaleData(localeCS);

@NgModule({
  declarations: [
    AppComponent,
    DataImportComponent,
    DashboardComponent,
    MessageBoxComponent,
    DataVerifyComponent,
    NavigationComponent,
    ResultComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'cs' // 'de-DE' for Germany, 'fr-FR' for France ...
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
