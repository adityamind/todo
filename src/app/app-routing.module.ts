import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from './modules/common/error-page/error-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'user', pathMatch: 'full' },
  {
    path:'user',
    loadChildren:()=>import('./modules/users/users.module').then(m=>m.UsersModule)
  },
  {
    path:'home',
    loadChildren:()=>import('./modules/main/main.module').then(m=>m.MainModule)
  },

  {
    path:'**',
    component:ErrorPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
