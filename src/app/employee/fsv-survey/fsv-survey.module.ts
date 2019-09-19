import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FsvSurveyPage } from './fsv-survey.page';

const routes: Routes = [
  {
    path: '',
    component: FsvSurveyPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [FsvSurveyPage]
})
export class FsvSurveyPageModule {}
