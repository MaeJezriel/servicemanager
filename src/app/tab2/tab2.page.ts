import { Component, OnInit, ViewChild } from '@angular/core';
import { ActionSheetController, IonSlides, ModalController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { CalibrationPage } from '../checklist-modal/calibration/calibration.page';
import { CleaningPage } from '../checklist-modal/cleaning/cleaning.page';
import { SignaturePage } from '../customer-modal/signature/signature.page';
import { UserPhoto, PhotoService } from '../services/photo.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  //api
  datauser: any;


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

  //dismiss
  public dismiss(): void {
    this.modalCtrl.dismiss();
 }
 segmentModel = "summary";

  segmentChanged(event){
    console.log(this.segmentModel);
    
    console.log(event);
  }


  //modal
  public async cleaning() {
    const modal = await this.modalCtrl.create({
      component: CleaningPage,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

  //  //modal
   public async calibration() {
    const modal = await this.modalCtrl.create({
      component: CalibrationPage,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

     // //modal
     public async signature() {
      const modal = await this.modalCtrl.create({
        component: SignaturePage,
        cssClass: 'my-custom-class'
      });
      return await modal.present();
    }

  //image
  async ngOnInit() {
    await this.photoService.loadSaved();
    this.getDataUser();
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




//api
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
}



