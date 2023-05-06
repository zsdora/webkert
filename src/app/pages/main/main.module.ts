import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { MyDirectiveDirective } from 'src/app/my-directive.directive';


@NgModule({
  declarations: [
    MainComponent ,
    MyDirectiveDirective

  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    NgxPaginationModule ,
    FormsModule
  ]
})
export class MainModule { }
