import { Component, OnInit, Input } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular'

@Component({
  selector: 'app-call-comments',
  templateUrl: './call-comments.page.html',
  styleUrls: ['./call-comments.page.scss'],
})
export class CallCommentsPage implements OnInit {

  @Input() oppId:string;

  constructor(private navParams: NavParams, private modalController: ModalController) { }

  ngOnInit() {
  }

  dismissModal(){
    this.modalController.dismiss();
  }
}
