import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CallsWithoutFollowupsPage } from './calls-without-followups.page';

const routes: Routes = [
  {
    path: '',
    component: CallsWithoutFollowupsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CallsWithoutFollowupsPage]
})
export class CallsWithoutFollowupsPageModule {}
