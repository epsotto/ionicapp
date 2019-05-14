import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DataResolverService } from '../resolver/data-resolver.service';

const routes: Routes = [
  {path: "dashboard", loadChildren: "./dashboard/dashboard.module#DashboardPageModule"},
  { path: "followup", loadChildren: "./followup/followup.module#FollowupPageModule" },
  { path: "view-activity-detail/:OppId", 
    resolve: {
      special: DataResolverService
    },
    loadChildren: "./view-activity-detail/view-activity-detail.module#ViewActivityDetailPageModule" },
  { path: "activities", loadChildren: "./activities/activities.module#ActivitiesPageModule" },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
