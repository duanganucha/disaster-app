import { ImageModalPage } from './../pages/image-modal/image-modal';
import { CallPage } from './../pages/call/call';
import { ListsPage } from './../pages/lists/lists';
import { TabsPage } from './../pages/tabs/tabs';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { NativeAudio } from '@ionic-native/native-audio';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule, AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { EditPage } from '../pages/edit/edit';

import { IonicImageViewerModule } from 'ionic-img-viewer';
import { Camera } from '@ionic-native/camera';


export const firebaseConfig = {
  apiKey: "AIzaSyD-CfvT1RFiJv-f6p0QU2e5fIoFQsrVm84",
  authDomain: "disaster-e4065.firebaseapp.com",
  databaseURL: "https://disaster-e4065.firebaseio.com",
  projectId: "disaster-e4065",
  storageBucket: "disaster-e4065.appspot.com",
  messagingSenderId: "941580326823"
};


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    ListsPage,
    CallPage,
    EditPage,
    ImageModalPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    IonicImageViewerModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    ListsPage,
    CallPage,
    EditPage,
    ImageModalPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireDatabase,
    BarcodeScanner,
    NativeAudio,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
