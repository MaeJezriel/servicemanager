import { AfterViewInit, Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SignaturePad } from 'angular2-signaturepad';

@Component({
  selector: 'app-signature',
  templateUrl: './signature.page.html',
  styleUrls: ['./signature.page.scss'],
})
export class SignaturePage implements OnInit,  AfterViewInit {

  @ViewChild(SignaturePad) signaturePad: SignaturePad;
  signatureImg : string;
  signaturePadOptions: Object = { 
    'minWidth': 5,
    'canvasWidth': 330,
    'canvasHeight': 300
  };
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }


//dismiss
public dismiss(): void {
  this.modalCtrl.dismiss();
}


ngAfterViewInit() {
  // this.signaturePad is now available
  this.signaturePad.set('minWidth', 5); // set szimek/signature_pad options at runtime
  this.signaturePad.clear(); // invoke functions from szimek/signature_pad API
}

drawComplete() {
  // will be notified of szimek/signature_pad's onEnd event
  console.log(this.signaturePad.toDataURL());
}

drawStart() {
  // will be notified of szimek/signature_pad's onBegin event
  console.log('begin drawing');
}

clearPad() {
  this.signaturePad.clear();
}

savePad() {
  this.signatureImg = this.signaturePad.toDataURL();
}
}