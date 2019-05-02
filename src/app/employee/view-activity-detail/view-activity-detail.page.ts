import { Component, OnInit } from '@angular/core';
import { DataStorageService } from 'src/app/services/data-storage.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-view-activity-detail',
  templateUrl: './view-activity-detail.page.html',
  styleUrls: ['./view-activity-detail.page.scss'],
})
export class ViewActivityDetailPage implements OnInit {
  oppId:any;

  constructor(private dataStorage: DataStorageService,
              private route: ActivatedRoute,
              private router: Router){}
  
  ngOnInit(){
    this.oppId = this.route.snapshot.params; //Only needed the params. Data passing is returning undefined.
  }


}
