import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AlertController, LoadingController, ToastController  } from '@ionic/angular';
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  credentials = {
    email: '',
    pw: ''
  };
 
  constructor(
    private auth: AuthService,
    private router: Router,
    private alertCtrl: AlertController,
    public toastController: ToastController,
    public loadingController: LoadingController
  ) {}
 
  ngOnInit() {}
 
  login() {
    this.auth.login(this.credentials).subscribe(async res => {
      if (res) {
        this.router.navigateByUrl('/members');
      } else {
        const alert = await this.alertCtrl.create({
          header: 'Login Failed',
          message: 'Please provide all the required values!',
          buttons: ['OK']
        });
        await alert.present();
      }
    });
  }

  async successLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 2000
    });
    await loading.present();

    await loading.onDidDismiss().then(() => {
      this.router.navigateByUrl('/members');
    });
  }
 
}