import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DataResolverService } from '../resolver/data-resolver.service';

const routes: Routes = [
  { path: "overdues", loadChildren: "./calls/overdues/overdues.module#OverduesPageModule" },
  { path: "view-activity-detail/:OppId", 
    resolve: {
      special: DataResolverService
    },
    loadChildren: "./view-activity-detail/view-activity-detail.module#ViewActivityDetailPageModule" },
  { path: 'multiple-numbers', loadChildren: './multiple-numbers/multiple-numbers.module#MultipleNumbersPageModule' },
  { path: 'checkout', loadChildren: './checkout/checkout.module#CheckoutPageModule' },
  { path: 'calls-followups', loadChildren: './calls/calls-followups/calls-followups.module#CallsFollowupsPageModule' },
  { path: 'calls-without-followups', loadChildren: './calls/calls-without-followups/calls-without-followups.module#CallsWithoutFollowupsPageModule' },
  { path: 'calls-arrange-fsv', loadChildren: './calls/calls-arrange-fsv/calls-arrange-fsv.module#CallsArrangeFsvPageModule' },
  { path: 'calls-planned', loadChildren: './calls/calls-planned/calls-planned.module#CallsPlannedPageModule' },
  { path: 'meetings-planned', loadChildren: './meetings-planned/meetings-planned.module#MeetingsPlannedPageModule' },
  { path: 'report', loadChildren: './report/report.module#ReportPageModule' },  { path: 'search-page', loadChildren: './search-page/search-page.module#SearchPagePageModule' },
  { path: 'create-activity', loadChildren: './create-activity/create-activity.module#CreateActivityPageModule' },


];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
