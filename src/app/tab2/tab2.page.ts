import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  public questStats: any = {};

  constructor(private storage: Storage) {

  }

  ionViewWillEnter(){
    this.storage.get('questStats').then((val) => {
      if (val != null){
       this.questStats = JSON.parse(val)
      }
      else{
      this.questStats = {
          world: 1,
          hp: 100,
          level: 1,
          exp: 0
          }
       this.storage.set('questStats', JSON.stringify(this.questStats));
      }
    });
  }

}
