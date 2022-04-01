import { Component } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

    //api
    datauser: any;

  constructor( public api: ApiService) {}

}
