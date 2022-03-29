import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-calibration',
  templateUrl: './calibration.page.html',
  styleUrls: ['./calibration.page.scss'],
})
export class CalibrationPage implements OnInit {

  constructor(private modalCtrl: ModalController) {}

   //dismiss
   public dismiss(): void {
    this.modalCtrl.dismiss();
 }

  ngOnInit() {
  }

}
