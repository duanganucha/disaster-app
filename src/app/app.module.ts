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

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule, AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';


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
    CallPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    ListsPage,
    CallPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireDatabase,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
