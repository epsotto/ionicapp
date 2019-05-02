import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ViewOpportunityPage } from './view-opportunity.page';

const routes: Routes = [
  {
    path: '',
    component: ViewOpportunityPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ViewOpportunityPage]
})
export class ViewOpportunityPageModule {}
