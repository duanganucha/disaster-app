import { CallPage } from './../call/call';
import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ListsPage } from '../lists/lists';



@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  tab1: any;
  tab2: any;
  tab3: any;

  constructor() {
    this.tab1 = HomePage;
    this.tab2 = ListsPage;
    this.tab3 = CallPage;
  }
}
