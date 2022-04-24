import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, IonSlides, ToastController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { Tab2Page } from '../tab2/tab2.page';
import { AuthService } from '../services/auth.service';
import { DbService } from '../services/db.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  Data: any[] = []
  mainForm: FormGroup;

  //login
  user = null;

  //slider
  @ViewChild("SwipedSliderContainer", { static: true })
  public SwipedSliderContainer: IonSlides;

  public tabs: any = [];
  public tabIndex: number;
 
  constructor(private modalCtrl: ModalController, private modalController: ModalController,
    public api: ApiService, private auth: AuthService,  private router: Router,
    private db: DbService,  public formBuilder: FormBuilder,  private toast: ToastController ) {}

    ngOnInit() {
      this.db.dbState().subscribe((res) => {
        if(res){
          this.db.fetchSongs().subscribe(item => {
            this.Data = item
          })
        }
      });
      this.mainForm = this.formBuilder.group({
        location: [''],
        task: [''],
        time: [''],
        service: [''], 
        problem: ['']
      })
    }
    storeData() {
      this.db.addSong(
        this.mainForm.value.location,
        this.mainForm.value.task,
        this.mainForm.value.time,
        this.mainForm.value.service,
        this.mainForm.value.problem
      ).then((res) => {
        this.mainForm.reset();
      })
    }
    deleteSong(id){
      this.db.deleteSong(id).then(async(res) => {
        let toast = await this.toast.create({
          message: 'Song deleted',
          duration: 2500
        });
        toast.present();      
      })
    }
    public segmentChange(event) {
      const newtab = event._value;
      // slider.slideTo(newtab);
    }
    
    segmentModel = "assigned";

    segmentChanged(event){
      console.log(this.segmentModel);
      
      console.log(event);
    }

  public date:any = new Date().toISOString();
  public dates:any = new Date().toISOString();

  now = new Date();

  //login
  ionViewWillEnter() {
    this.user = this.auth.getUser();
  }
 
  logout() {
    this.auth.logout();
  }
  

  // async view() {
  //   const modal = await this.modalCtrl.create({
  //     component: JobSummaryPage,
  //     cssClass: 'my-custom-class'
  //   });
  //   return await modal.present();
  // }

  public async openJobSummary() {
    const modal = await this.modalController.create({
      component: Tab2Page,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

  //View Details in Completed Jobs
  // public async openCompletedJobs() {
  //   const modal = await this.modalController.create({
  //     component: Tab1CompletedPage,
  //     cssClass: 'my-custom-class'
  //   });
  //   return await modal.present();
  // }

}







