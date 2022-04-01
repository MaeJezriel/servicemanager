import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-view-details',
  templateUrl: './view-details.page.html',
  styleUrls: ['./view-details.page.scss'],
})
export class ViewDetailsPage implements OnInit {

  constructor(private modalCtrl: ModalController ) {}

  //Dismiss
  public dismiss(): void {
    this.modalCtrl.dismiss();
 }

  ngOnInit() {
  }

}
