import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DrugComponent } from './drug/drug.component';
import { GenerateIdComponent } from './generate-id/generate-id.component';
import { HomeComponent } from './home/home.component';
import { ProductListComponent } from './product-list/product-list.component';

const routes: Routes = [
  { path: 'employee', component: ProductListComponent},
  { path: 'drug', component: DrugComponent },
  { path: 'generate-id' , component: GenerateIdComponent },
  { path: 'home' , component: HomeComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
