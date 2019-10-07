import { Component } from '@angular/core';
import { NavController, ModalController, ActionSheetController  } from '@ionic/angular';
import { SetDetailPage } from '../set-detail/set-detail.page';
import { Storage } from '@ionic/storage';
import { PracticePage } from '../practice/practice.page';
import { PlayPage } from '../play/play.page';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  public sets: any = [];
  public questStats: any;
  public language: any;

  constructor(public navCtrl: NavController, public modalController: ModalController, private storage: Storage, public actionSheetController: ActionSheetController, private _translate: TranslateService) {
    this.storage.get('setsArr').then((val) => {
      if (val != "[]"){
       this.sets = JSON.parse(val)
      }
      else{
       this.storage.set('setsArr', JSON.stringify(this.sets));
      }
    });

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

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    prefersDark.addListener((e) => this.checkToggle(e.matches));
    this.checkToggle(prefersDark.matches)

  }

  ngOnInit() {
    this.storage.get('lang').then((val) => {
      if (val != null){
        this._translate.use(val);
        this.language = val;
      }
      else{
        this._translate.use(this._translate.getBrowserLang());
       this.storage.set('lang', this._translate.getBrowserLang());
       this.language = this._translate.getBrowserLang()
      }

    });
  }

  checkToggle(shouldCheck) {
    var darkOpt

    this.storage.get('darkMode').then((val) => {
      if (val != null){
        darkOpt = val
      }
      else{
       this.storage.set('darkMode', 'system');
       darkOpt = 'system'
      }

      if(darkOpt == 'system'){
        if(shouldCheck == true){
          document.body.classList.add('dark')
        }
        if(shouldCheck == false){
          document.body.classList.remove('dark')
        }
      }

      if(darkOpt == 'on'){
        document.body.classList.add('dark')
      }
      if(darkOpt == 'off'){
        document.body.classList.remove('dark')
      }
    });

  }

  async openMenu(set){
    const actionSheet = await this.actionSheetController.create({
      header: set.title,
      buttons: [{
        text: this._translate.instant('Delete'),
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.removeSet(set)
        }
      }, {
        text: this._translate.instant('Details'),
        icon: 'information-circle-outline',
        handler: () => {
          this.editSet(set)
        }
      }, {
        text: this._translate.instant('Practice'),
        icon: 'school',
        handler: () => {
          this.practice(set)
        }
      }, {
        text: this._translate.instant('Battle'),
        icon: 'logo-game-controller-a',
        handler: () => {
          this.play(set)
        }
      }, {
        text: this._translate.instant('Cancel'),
        icon: 'close',
        role: 'cancel',
        handler: () => {
        }
      }]
    });
    await actionSheet.present();
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

  async play(set){

    var copySet = JSON.parse(JSON.stringify(set))
    var questStatsCopy = JSON.parse(JSON.stringify(this.questStats))

    const modal = await this.modalController.create({
      component: PlayPage,
      componentProps: {
        playSet: copySet,
        questStats: questStatsCopy 
      },
      cssClass: "fullscreenModal"
    });

    modal.onDidDismiss()
      .then((data) => {
          if (data.data != undefined){
            this.questStats = data.data
            this.storage.set('questStats', JSON.stringify(this.questStats));
          }
    });

    await modal.present(); 

    await modal.present(); 
  }

  

}
