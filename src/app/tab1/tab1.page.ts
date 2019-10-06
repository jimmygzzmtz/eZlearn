import { Component } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { SetDetailPage } from '../set-detail/set-detail.page';
import { Storage } from '@ionic/storage';
import { PracticePage } from '../practice/practice.page';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  public sets: any = [];

  constructor(public navCtrl: NavController, public modalController: ModalController, private storage: Storage) {
    this.storage.get('setsArr').then((val) => {
      if (val != "[]"){
       this.sets = JSON.parse(val)
      }
      else{
       this.storage.set('setsArr', JSON.stringify(this.sets));
      }
    });

  }

  async addSet() {
    //create new set with only 1 term, but not in storage
    //send to navctrl
    //when clicking a set send the term selected

    /*
    var set = {
      title: "",
      cards: [{term: "", definition: ""}],
      cardsNum: 0,
      date: new Date,
      practiced: 0,
    } 
    this.navCtrl.navigateForward('set-detail', { state: { set } });
    */

   var set = {
    title: "",
    cards: [{term: "", definition: ""}],
    cardsNum: 0,
    date: new Date
    //practiced: 0,
    } 

    const modal = await this.modalController.create({
      component: SetDetailPage,
      componentProps: { 
        newSet: set
      },
      cssClass: "fullscreenModal"
    });

    modal.onDidDismiss()
      .then((data) => {
          if (data.data != undefined){
            if(this.sets == null){
              this.sets = [];
              this.sets.push({
                title: data.data.title,
                cards: data.data.cards,
                cardsNum: data.data.cardsNum,
                date: data.data.date
                //practiced: data.data.practiced
              })
            }
            else{
              this.sets.push(data.data)
            }

            this.storage.set('setsArr', JSON.stringify(this.sets));
            
          }
    });

    await modal.present(); 

  }

  removeSet(set) {

    let index = this.sets.indexOf(set);

        if(index > -1){
            this.sets.splice(index, 1);
            this.storage.set('setsArr', JSON.stringify(this.sets));
        }

  }

  async editSet(set) {

    var copySet = JSON.parse(JSON.stringify(set))

    let index = this.sets.indexOf(set);

    const modal = await this.modalController.create({
      component: SetDetailPage,
      componentProps: {
        newSet: copySet 
      },
      cssClass: "fullscreenModal"
    });

    modal.onDidDismiss()
      .then((data) => {
          if (data.data != undefined){
            this.sets[index] = data.data
            this.storage.set('setsArr', JSON.stringify(this.sets));
          }
    });

    await modal.present(); 

  }

  async practice(set){

    var copySet = JSON.parse(JSON.stringify(set))

    const modal = await this.modalController.create({
      component: PracticePage,
      componentProps: {
        practiceSet: copySet 
      },
      cssClass: "fullscreenModal"
    });

    await modal.present(); 
  }

  

}
