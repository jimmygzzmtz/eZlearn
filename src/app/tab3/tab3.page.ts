import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(public alertController: AlertController) {

  }

  async installPrompt(){
    const alert = await this.alertController.create({
      header: "Install",
      message: "<ion-icon name='logo-apple'></ion-icon> Tap on <ion-icon name='share'></ion-icon>, then 'Add to Homescreen'.<br><br><ion-icon name='logo-android'></ion-icon> Tap on <ion-icon name='menu'></ion-icon>, then 'Add to Homescreen'.<br><br><ion-icon name='logo-chrome'></ion-icon> Click on <ion-icon name='add'></ion-icon> on the address bar.",
      buttons: [
        {
            text: 'OK'
        }
    ]
    });

    await alert.present();
  }

}
