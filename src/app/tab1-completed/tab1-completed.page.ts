import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { Tab2Page } from '../tab2/tab2.page';
import { AuthService } from '../services/auth.service';
import { Tab1Page } from '../tab1/tab1.page';

@Component({
  selector: 'app-tab1-completed',
  templateUrl: './tab1-completed.page.html',
  styleUrls: ['./tab1-completed.page.scss'],
})
export class Tab1CompletedPage implements OnInit {

  //login
  user = null;
 
  constructor(private modalCtrl: ModalController, private modalController: ModalController,
    public api: ApiService, private auth: AuthService) {}

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

  ngOnInit() {
  }

  //View Details in Assigned Jobs
  public async openAssignedJobs() {
    const modal = await this.modalController.create({
      component: Tab1Page,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

  public async openJobSummary() {
    const modal = await this.modalController.create({
      component: Tab2Page,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

}
