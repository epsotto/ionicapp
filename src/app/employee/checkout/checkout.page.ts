import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {
  @Input() oppId:string;
  comment:string="";

  constructor(private modal: ModalController) { }

  ngOnInit() {
  }

  submitComment(){
    this.modal.dismiss(this.comment);
  }

  dismissModal() {
    this.modal.dismiss();
  }
}
