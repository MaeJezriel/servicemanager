import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { Tab2Page } from '../tab2/tab2.page';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

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
  
  ngOnInit() { }


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

}







