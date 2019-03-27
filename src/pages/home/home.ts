import { EditPage } from './../edit/edit';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { NativeAudio } from '@ionic-native/native-audio';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  scannedCode: any;
  barcodeFirebase = null ;
  colorChange = null;
  private itemsCollection: AngularFirestoreCollection<any>;
  items: any;


  constructor(
    public navCtrl: NavController,
    private barcodeScanner: BarcodeScanner,
    private nativeAudio: NativeAudio,
    private afDB: AngularFirestore) {
      
    this.nativeAudio.preloadSimple('uniqueId1', '../../assets/sound/Beep_Short.mp3').then(() => {
      console.log('onSuccess')
    }, (error) => {
      console.log(error)
    });

  }

  scanCode() {
    this.barcodeScanner.scan().then(barcodeData => {

      this.scannedCode = barcodeData.text;
      this.nativeAudio.play('uniqueId1', () => console.log('uniqueId1 is done playing'));
      this.nativeAudio.stop('uniqueId1'),() => console.log('uniqueId1 is done stop');
      this.getData(barcodeData.text)
    })
  }

  getData(barcodeText){
    this.afDB.collection('qrnumber', ref => ref.where('qrNumber', '==', barcodeText )).snapshotChanges()
    .pipe(
       map(changes => {
         return changes.map(a => {
           const data = a.payload.doc.data() as Iclass ;
           data.id = a.payload.doc.id;
           return data;
         })
       })
    ).subscribe(data =>{
      this.barcodeFirebase = data
      console.log(this.barcodeFirebase)
      this.getImage(data)
    });
  }

  getTest(){
    console.log('getTest')
    this.afDB.collection('qrnumber', ref => ref.where('qrNumber', '==', 'sskh-2019-7' )).snapshotChanges()
    .pipe(
       map(changes => {
         return changes.map(a => {
           const data = a.payload.doc.data() as Iclass ;
           data.id = a.payload.doc.id;
           return data;
         })
       })
    ).subscribe(data =>{
      this.barcodeFirebase = data
      console.log(this.barcodeFirebase);
      this.getImage(data);
      this.onChangeTriage(data[0]);
    });
  }
  
  getImage(data){
    
    if(data[0].image == null){
      this.barcodeFirebase[0].image = "../../assets/imgs/avatar.png"
    } 
  } 

  editItem(item){
    console.log(item)
    this.navCtrl.push(EditPage,{item : item});
  }

  onChangeTriage(data){
    console.log(data.triage)
    switch(data.triage) { 
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
}

interface Iclass{
  id : string;
  qrNumber :string;
  creatAt :string;
  triage :string;
}