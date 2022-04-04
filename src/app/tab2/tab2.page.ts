import { Component, OnInit, ViewChild } from '@angular/core';
import { ActionSheetController, IonSlides, ModalController } from '@ionic/angular';
import { SignaturePad } from 'angular2-signaturepad';
import { ApiService } from '../api.service';
import { CalibrationPage } from '../checklist-modal/calibration/calibration.page';
import { CleaningPage } from '../checklist-modal/cleaning/cleaning.page';
import { SignaturePage } from '../customer-modal/signature/signature.page';
import { ViewDetailsPage } from '../history-modal/view-details/view-details.page';
import { UserPhoto, PhotoService } from '../services/photo.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  //canvas
  @ViewChild(SignaturePad) signaturePad: SignaturePad;
  signatureImg : string;
  signaturePadOptions: Object = { 
    'minWidth': 5,
    'canvasWidth': 500,
    'canvasHeight': 300
  };

  //api
  datauser: any;
  mainfault: any;

  @ViewChild("SwipedSliderContainer", { static: true })
  public SwipedSliderContainer: IonSlides;

  public tabs: any = [];
  public tabIndex: number;

  constructor(private modalCtrl: ModalController, public api: ApiService,
    public photoService: PhotoService, public actionSheetController: ActionSheetController) {}

  public segmentChange(event) {
    const newtab = event._value;
    // slider.slideTo(newtab);
  }

  //Dismiss Btn
  public dismiss(): void {
    this.modalCtrl.dismiss();
 }
 segmentModel = "summary";

  segmentChanged(event){
    console.log(this.segmentModel);
    
    console.log(event);
  }

  //Cleaning
  public async cleaning() {
    const modal = await this.modalCtrl.create({
      component: CleaningPage,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

  //Calibration
   public async calibration() {
     const modal = await this.modalCtrl.create({
       component: CalibrationPage,
       cssClass: 'my-custom-class'
      });
      return await modal.present();
  }

  //Signature
    public async signature() {
      const modal = await this.modalCtrl.create({
        component: SignaturePage,
        cssClass: 'my-custom-class'
      });
      return await modal.present();
    }

  //View Details in History Page
    public async historydetails() {
      const modal = await this.modalCtrl.create({
        component: ViewDetailsPage,
        cssClass: 'my-custom-class'
      });
      return await modal.present();
    }

  //Get Function
  async ngOnInit() {
    await this.photoService.loadSaved();
    this.getDataUser();
    this.getMainfaultCode();
  }

  public async showActionSheet(photo: UserPhoto, position: number) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Photos',
      buttons: [{
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.photoService.deletePicture(photo, position);
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          // Nothing to do, action sheet is automatically closed
         }
      }]
    });
    await actionSheet.present();
  }
  
  //API
  async getDataUser() {
    await this.api.getDataUser()
    .subscribe(res => {
      console.log(res);
      this.datauser = res.results;
      console.log(this.datauser);
    }, err => {
      console.log(err);
    });
  }

  //GET DATA MAINFAULT CODE
  async getMainfaultCode() {
    await this.api.getMainfaultCode()
    .subscribe(res => {
      console.log(res);
      this.mainfault = res.results;
      console.log(this.mainfault);
    }, err => {
      console.log(err);
    });
  }
}



