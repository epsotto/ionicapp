import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-multiple-numbers',
  templateUrl: './multiple-numbers.page.html',
  styleUrls: ['./multiple-numbers.page.scss'],
})
export class MultipleNumbersPage implements OnInit {

  @Input() contactNumbers:any[];

  constructor(private modalController : ModalController) { }

  ngOnInit() {
  }

  dismissModal(){
    this.modalController.dismiss();
  }

  selectContactNumber(selectedNumber){
    this.modalController.dismiss(selectedNumber);
  }
}
