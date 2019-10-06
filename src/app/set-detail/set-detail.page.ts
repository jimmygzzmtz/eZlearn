import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-set-detail',
  templateUrl: './set-detail.page.html',
  styleUrls: ['./set-detail.page.scss'],
})
export class SetDetailPage implements OnInit {

  public cards: any
  public title: any

  public newSet: any

  constructor(public navCtrl: NavController, public modalController: ModalController) { 
    /*
    this.set = window.history.state.set
    this.cards = this.set.cards
    this.title = this.set.title
    */
  }

  ionViewWillEnter(){
    if(this.newSet != undefined){
      this.cards = this.newSet.cards
      this.title = this.newSet.title
    }
  }

  ngOnInit() {
  }

  addTerm(){
    this.cards.push({term: "", definition: ""})
  }

  save(){
    this.newSet.title = this.title
    this.newSet.cards = this.cards
    //console.log(this.set)
    
    //window.history.state.set = this.set
    //console.log(window.history.state.set)
    //this.navCtrl.back()
    //this.navCtrl.navigateBack('tab1', { state: { setSend } });

    this.newSet.cardsNum = this.newSet.cards.length

    this.modalController.dismiss(this.newSet)

  }

  dismiss(){
    this.modalController.dismiss();
  }

}
