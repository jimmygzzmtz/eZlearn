import { Component, OnInit } from '@angular/core';
import { NavController, ModalController, ToastController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-set-detail',
  templateUrl: './set-detail.page.html',
  styleUrls: ['./set-detail.page.scss'],
})
export class SetDetailPage implements OnInit {

  public cards: any
  public title: any

  public newSet: any


  constructor(public navCtrl: NavController, public modalController: ModalController, public toastController: ToastController, public alertController: AlertController) { 
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

  removeCard(card) {

    let index = this.cards.indexOf(card);

        if(index > -1){
            this.cards.splice(index, 1);
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

  async export(){
    let newNavigator: any;
    newNavigator = window.navigator;

    if (newNavigator && newNavigator.share) {
      newNavigator.share({
        title: this.title,
        text: JSON.stringify(this.newSet),
        //url: final url of app,
      })
    } else {
      let listener = (e: ClipboardEvent) => {
        e.clipboardData.setData('text/plain', (JSON.stringify(this.newSet)));
        e.preventDefault();
      };

      document.addEventListener('copy', listener);
      document.execCommand('copy');
      document.removeEventListener('copy', listener);

      const toast = await this.toastController.create({
        message: this.title + ' has been copied to the clipboard.',
        duration: 2000
      });
      toast.present();
    }
  }

  async import(){

    const alert = await this.alertController.create({
      header: 'Import',
      inputs: [
        {
          name: 'code',
          type: 'text'
        }
      ],
      buttons: [
        {
            text: 'Cancel'
        },
        {
            text: 'Save',
            handler: data => {

              try{
                JSON.parse(data.code)

                if(data.code != ""){

                  var codedSet = JSON.parse(data.code)
                  this.cards = codedSet.cards
                  this.title = codedSet.title
  
                }
                else{
                  return false;
                }
              }
              catch{
                console.log("error")
                return false;
              }

            }
        }
    ]
    });

    await alert.present();
  }

}
