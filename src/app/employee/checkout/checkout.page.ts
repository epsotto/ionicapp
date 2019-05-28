import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {
  @Input() oppId:string;
  comment:string = "";
  markDone:boolean = false;

  constructor(private modal: ModalController) { }

  ngOnInit() {
  }

  onSubmit(){
    const ouput = {
      markedDone: this.markDone,
      comment: this.comment
    }
    this.modal.dismiss(ouput);  
  }

  dismissModal() {
    this.modal.dismiss();
  }
}
