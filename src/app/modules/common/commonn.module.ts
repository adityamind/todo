import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopupComponent } from './popup/popup.component';
import { KeyboardEventDirective } from './directive/keyboard-event.directive';
import {MatIconModule} from '@angular/material/icon';
import { ErrorPageComponent } from './error-page/error-page.component';


@NgModule({
  declarations: [
    PopupComponent,
    KeyboardEventDirective,
    ErrorPageComponent
  ],
  imports: [
    CommonModule,
    MatIconModule
  ],
  exports:[
    PopupComponent,
    KeyboardEventDirective,
    ErrorPageComponent
  ]
})
export class CommonnModule { }
