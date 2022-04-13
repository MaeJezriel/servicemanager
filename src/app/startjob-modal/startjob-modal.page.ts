import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-startjob-modal',
  templateUrl: './startjob-modal.page.html',
  styleUrls: ['./startjob-modal.page.scss'],
})
export class StartjobModalPage implements OnInit {

  setForm: FormGroup;
  isSubmitted: boolean = false;


  minDate: any;
  minEndDate: any;

  startDate: any;
  endDate: any;
  startTime: any;

  enabledEndDate = true;
  today = new Date();

  constructor(private modalCtrl: ModalController, public toastController: ToastController ) { }

  //Dismiss
  public dismiss(): void {
    this.modalCtrl.dismiss();
  }

  ngOnInit() {
    // this.buildSetForm();
  }


  setMinDateForEnd(): void {
    this.minEndDate = this.startDate;
    this.enabledEndDate = false;
  }

  // buildSetForm(){
  //   this.setForm = this.formBuilder.group({
  //       fromDate: ['', [Validators.required]]
  //     });
  // }

  setDates() {
    this.isSubmitted = true;
    if (!this.setForm.valid) {
      return false;
    } else {
      this.setInactiveDates();
    }
  }

  async setInactiveDates(){
    if(this.startDate === undefined || this.startTime === undefined){
      this.requiredDates();
    }
    else{
      this.modalCtrl.dismiss();

      // await this.dataService.sendApiRequest('setJeepInactiveDates', this.jeepData).subscribe(
      //   (data: { code: any;}) => {
      //     if(data.code === 200){
      //       this.successSetInactives();
      //       this.modalCtrl.dismiss();
      //     }else{
      //       this.somethingWrong();
      //     }
      //   });
    }
  }

  async successSetInactives() {
    const toast = await this.toastController.create({
      message: 'Successfully setted inactive dates!',
      duration: 2000
    });

    toast.present();
    await toast.onDidDismiss();
  }

  async requiredDates(){
    const toast = await this.toastController.create({
      message: 'Start and End Date is required!',
      duration: 2500
    });

    toast.present();
    await toast.onDidDismiss();
  }

  async somethingWrong() {
    const toast = await this.toastController.create({
      message: 'Something Went Wrong! Please try again.',
      duration: 2000
    });

    toast.present();
    await toast.onDidDismiss();
  }

}
