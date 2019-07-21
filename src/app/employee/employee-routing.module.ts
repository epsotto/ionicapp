import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DataResolverService } from '../resolver/data-resolver.service';

const routes: Routes = [
  { path: "dashboard", loadChildren: "./dashboard/dashboard.module#DashboardPageModule" },
  { path: "overdues", loadChildren: "./overdues/overdues.module#OverduesPageModule" },
  { path: "view-activity-detail/:OppId", 
    resolve: {
      special: DataResolverService
    },
    loadChildren: "./view-activity-detail/view-activity-detail.module#ViewActivityDetailPageModule" },
  { path: "activities", loadChildren: "./activities/activities.module#ActivitiesPageModule" },
  { path: 'multiple-numbers', loadChildren: './multiple-numbers/multiple-numbers.module#MultipleNumbersPageModule' },
  { path: 'checkout', loadChildren: './checkout/checkout.module#CheckoutPageModule' },
  { path: 'calls-followups', loadChildren: './calls-followups/calls-followups.module#CallsFollowupsPageModule' },
  { path: 'calls-without-followups', loadChildren: './calls-without-followups/calls-without-followups.module#CallsWithoutFollowupsPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
