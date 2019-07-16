import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CallsArrangeFsvPage } from './calls-arrange-fsv.page';

const routes: Routes = [
  {
    path: '',
    component: CallsArrangeFsvPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CallsArrangeFsvPage]
})
export class CallsArrangeFsvPageModule {}
