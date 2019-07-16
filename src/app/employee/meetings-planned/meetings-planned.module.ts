import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MeetingsPlannedPage } from './meetings-planned.page';

const routes: Routes = [
  {
    path: '',
    component: MeetingsPlannedPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MeetingsPlannedPage]
})
export class MeetingsPlannedPageModule {}
