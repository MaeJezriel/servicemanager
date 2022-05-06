import { Component, OnInit, ViewChild } from '@angular/core';
import { ActionSheetController, IonSlides, ModalController, ToastController } from '@ionic/angular';
import { SignaturePad } from 'angular2-signaturepad';
import { ApiService } from '../api.service';
import { CalibrationPage } from '../checklist-modal/calibration/calibration.page';
import { CleaningPage } from '../checklist-modal/cleaning/cleaning.page';
import { SignaturePage } from '../customer-modal/signature/signature.page';
import { ViewDetailsPage } from '../history-modal/view-details/view-details.page';
import { StartjobModalPage } from '../startjob-modal/startjob-modal.page';
import { UserPhoto, PhotoService } from '../services/photo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DbService } from '../services/db.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  //form
  editForm: FormGroup;
  id: any;

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
    private toastCtrl: ToastController, 
    public formBuilder: FormBuilder,
    private db: DbService,
    public modalController: ModalController,
    private actRoute: ActivatedRoute,
    public toastController: ToastController,
    private router: Router,
    public photoService: PhotoService, public actionSheetController: ActionSheetController) {
      this.id = this.actRoute.snapshot.paramMap.get('id');
      this.db.getJob(this.id).then(res => {
        this.editForm.setValue({
           location_name: res['location_name'],
          // tasks_name: res['tasks_name'],
          service_request: res['service_request'],
          site_equipment: res['site_equipment'],
          problem_name: res['problem_name'],
          action_name: res['action_name'],
          recommended_name: res['recommended_name'],
          fault_code: res['fault_code'],
          customer_name: res['customer_name'],
          position_name: res['position_name']
        })
      })
    }

  public segmentChange(event) {
    const newtab = event._value;
    // slider.slideTo(newtab);
  }


  //toastcontroller
  async presentToast() {
    let toast =  this.toastCtrl.create({
      message: 'Comments was added successfully',
      duration: 3000,
      position: 'top'
    });
  
   (await toast).onDidDismiss().then(() => {
      //this.router.navigateByUrl('/members');
    });
    
    (await toast).present();
  }

  //Dismiss Btn
  public dismiss(): void {
    this.modalCtrl.dismiss();
  }

  //Popover
  customPopoverOptions: any = {
    cssClass: 'popover-wide',
  };

  customOptions: any = {
    cssClass: 'popover',
  }
  
  //Segment
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

  //Start Job Button
  public async startJob() {
    const modal = await this.modalCtrl.create({
      component: StartjobModalPage,
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

    //mainform
    this.editForm = this.formBuilder.group({
      location_name: [''],
      // task: [''],
      service_request: [''],
      site_equipment: [''],
      problem_name: [''],
      action_name: [''],
      recommended_name: [''],
      fault_code:[''],
      customer_name:[''],
      position_name: ['']
      
    })


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
      this.mainfault = res.data;
      console.log(this.mainfault);
    }, err => {
      console.log(err);
    });
  }

  //SQLITE
  saveForm(){
    this.db.updateJob(this.id, this.editForm.value)
    .then( (res) => {
      console.log(res)
      this.successEditjobAlert();
    })
  }

async successEditjobAlert() {
    this.dismissModal();
    const toast = await this.toastController.create({
      message: 'Successfully Edited!',
      duration: 2000
    });
    toast.present();
    await toast.onDidDismiss();
  }

  dismissModal() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

}



