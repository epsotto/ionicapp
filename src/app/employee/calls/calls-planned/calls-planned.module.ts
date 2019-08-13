import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CallsPlannedPage } from './calls-planned.page';

const routes: Routes = [
  {
    path: '',
    component: CallsPlannedPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CallsPlannedPage]
})
export class CallsPlannedPageModule {}
