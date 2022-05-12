import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DrugComponent } from './drug/drug.component';

const routes: Routes = [
  { path: 'heroes', component: DrugComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
