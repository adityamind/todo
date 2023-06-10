import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ErrorPageComponent } from '../common/error-page/error-page.component';
import { HomeGuard } from 'src/app/guards/home.guard';

const routes: Routes = [
  {
    path:'',
    canActivate:[HomeGuard],
    component:HomeComponent
  },

  {
    path:'**',
    component:ErrorPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
