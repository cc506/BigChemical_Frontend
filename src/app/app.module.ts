import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { ProductListComponent } from './product-list/product-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgMaterialModule } from './ng-material.module';
import { DrugComponent } from './drug/drug.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { SensorsComponent } from './sensors/sensors.component';
import { RepairsComponent } from './repairs/repairs.component';
import { HttpClientModule } from '@angular/common/http';
import { AccessComponent } from './access/access.component';
import { AccessRightsComponent } from './access-rights/access-rights.component';
import { GenerateIdComponent } from './generate-id/generate-id.component';
import { DatePipe } from '@angular/common';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgMaterialModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', component: ProductListComponent },
    ]),
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    TopBarComponent,
    ProductListComponent,
    DrugComponent,
    HomeComponent,
    SensorsComponent,
    RepairsComponent,
    AccessComponent,
    AccessRightsComponent,
    GenerateIdComponent
  ],
  providers:[
    DatePipe
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/