import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-cleaning',
  templateUrl: './cleaning.page.html',
  styleUrls: ['./cleaning.page.scss'],
})
export class CleaningPage implements OnInit {

  constructor(private modalCtrl: ModalController) {}

  //Grouphead
  groupheads = [{
    name1: 'Yes',
    value: false
  }, {
    name1: 'No',
    value: false
  }];

  selection1(name1: string) {
    this.groupheads.forEach(x => {
      if (x.name1 !== name1) {
        x.value = !x.value
      }
    })
  }

  //Group
  groups = [{
    name2: 'Yes',
    value: false
  }, {
    name2: 'No',
    value: false
  }];

  selection2(name2: string) {
    this.groups.forEach(x => {
      if (x.name2 !== name2) {
        x.value = !x.value
      }
    })
  }

  //Group
  gaskets = [{
    name3: 'Yes',
    value: false
  }, {
    name3: 'No',
    value: false
  }];

  selection3(name3: string) {
    this.gaskets.forEach(x => {
      if (x.name3 !== name3) {
        x.value = !x.value
      }
    })
  }

   //dismiss
   public dismiss(): void {
    this.modalCtrl.dismiss();
 }

  ngOnInit() {
  }

}
