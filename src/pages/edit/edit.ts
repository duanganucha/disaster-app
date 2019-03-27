import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@IonicPage()
@Component({
  selector: 'page-edit',
  templateUrl: 'edit.html',
})
export class EditPage {
  item;
  colorChange = null;
  triage = null;
  sex = null;
  age = null;
  GCS = null;
  treatmentsAB = null;
  treatmentsC = null;
  treatmentsD = null;
  organ = null;
  wound = null;
  destination = null;
  name_first = null;
  name_last = null ;
  status = null;
  open = false;
  myDate = new Date();

  private itemDoc: AngularFirestoreDocument<any>;
  items: Observable<any>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    private camera: Camera,
    private afDB: AngularFirestore

  ) {
    this.item = this.navParams.get('item');
    this.triage = this.item.triage
    this.sex = this.item.sex
    this.age = this.item.age
    this.GCS = this.item.GCS
    this.treatmentsAB = this.item.treatmentsAB
    this.treatmentsC = this.item.treatmentsC
    this.treatmentsD = this.item.treatmentsD
    this.organ = this.item.organ
    this.wound = this.item.wound
    this.destination = this.item.destination
    this.name_first = this.item.name_first
    this.status = this.item.status

    this.onChangeTriage()

    this.itemDoc = this.afDB.doc<any>(`qrnumber/${this.item.id}`);
    this.item = this.itemDoc.valueChanges();
  }

  ngOnInit() {
    this.getImage()
  }


  onChangeTriage() {
    console.log(this.triage)
    switch (this.triage) {
      case "Resuscitation": {
        this.colorChange = "red"
        break;
      }
      case "Emergency": {
        this.colorChange = "pink"
        break;
      }
      case "Urgency": {
        this.colorChange = "yellow"
        break;
      }
      case "Semi-urgency": {
        this.colorChange = "green"
        break;
      }
      case "Non-urgency": {
        this.colorChange = "grey"
        break;
      }
      default: {
        //statements; 
        break;
      }
    }
  }

  takePhoto() {
    const options: CameraOptions = {
      quality: 30,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      cameraDirection:0
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      this.item.image = 'data:image/jpeg;base64,' + imageData;
     }, (err) => {
      // Handle error
     });
  }

  getImage() {
    if (this.item.image == null) {
      this.item.image = "../../assets/imgs/avatar.png"
    }
  }

  saveDate() {
 
    this.itemDoc.update({
      open : true,
      triage : this.triage , 
      sex : this.sex,
      age : this.age,
      GCS : this.GCS,
      treatmentsAB : this.treatmentsAB,
      treatmentsC : this.treatmentsC,
      treatmentsD : this.treatmentsD,
      organ : this.organ,
      wound : this.wound,
      destination : this.destination,
      name_first : this.name_first,
      name_last : this.name_last,
      status : this.status,
      misstionAt :  this.myDate.getFullYear() + '-' + this.myDate.getMonth() + '-' + this.myDate.getDate()

    });
 
    this.navCtrl.popToRoot();
  }
}