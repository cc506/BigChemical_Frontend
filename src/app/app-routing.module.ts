import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccessRightsComponent } from './access-rights/access-rights.component';
import { AccessComponent } from './access/access.component';
import { DrugComponent } from './drug/drug.component';
import { GenerateIdComponent } from './generate-id/generate-id.component';
import { HomeComponent } from './home/home.component';
import { ProductListComponent } from './product-list/product-list.component';
import { RepairsComponent } from './repairs/repairs.component';
import { SensorsComponent } from './sensors/sensors.component';

const routes: Routes = [
  { path: 'employee', component: ProductListComponent},
  { path: 'drug', component: DrugComponent },
  { path: 'generate-id' , component: GenerateIdComponent },
  { path: 'home' , component: HomeComponent},
  { path: 'sensors', component: SensorsComponent},
  { path: 'repairs', component: RepairsComponent},
  { path: 'access', component: AccessComponent},
  { path: 'access-rights', component: AccessRightsComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
