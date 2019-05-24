import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {
  @Input() oppId:string;
  comment:string="";
  errorMessage:boolean=false;

  constructor(private modal: ModalController) { }

  ngOnInit() {
  }

  onSubmit(checkoutCommentsForm:NgForm){
    if(checkoutCommentsForm.valid){
      this.errorMessage = false;
      this.modal.dismiss(this.comment);
    } 
    else {
      this.errorMessage = true;
    }
    
  }

  dismissModal() {
    this.modal.dismiss();
  }
}
