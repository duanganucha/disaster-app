import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

/**
 * Generated class for the ImageModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-image-modal',
  templateUrl: 'image-modal.html',
})
export class ImageModalPage {
  
  @ViewChild('slider', { read: ElementRef })slider: ElementRef;
  img: any;

  sliderOpts = {
    zoom: {
      maxRatio: 5
    }
  };
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private modalController: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ImageModalPage');
  }
  ngOnInit() {
    this.img = this.navParams.get('img');
  }

  zoom(zoomIn: boolean) {
    // let zoom = this.slider.nativeElement.swiper.zoom;
    console.log(this.slider)
    // if (zoomIn) {
    //   zoom.in();
    // } else {
    //   zoom.out();
    // }
  }

  close() {
    this.navCtrl.pop();
  }

}
