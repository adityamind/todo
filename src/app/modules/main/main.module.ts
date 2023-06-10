import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { HomeComponent } from './home/home.component';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { CardDrawerComponent } from './components/card-drawer/card-drawer.component';
import {MatIconModule} from '@angular/material/icon';
import {CommonnModule} from '../common/commonn.module';
import { HeaderComponent } from './components/header/header.component'
@NgModule({
  declarations: [
    HomeComponent,
    CardDrawerComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
    DragDropModule,
    MatIconModule,
  CommonnModule,
  FormsModule
  ],
  exports:[
    HomeComponent,
    CardDrawerComponent,
  ],
  providers:[]
})
export class MainModule { }
