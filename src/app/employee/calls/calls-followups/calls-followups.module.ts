import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CallsFollowupsPage } from './calls-followups.page';

const routes: Routes = [
  {
    path: '',
    component: CallsFollowupsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CallsFollowupsPage]
})
export class CallsFollowupsPageModule {}
