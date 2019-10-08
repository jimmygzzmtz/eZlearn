import { Component, OnInit } from '@angular/core';
import { NavController, ModalController, ToastController, AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-set-detail',
  templateUrl: './set-detail.page.html',
  styleUrls: ['./set-detail.page.scss'],
})
export class SetDetailPage implements OnInit {


  public cards: any
  public title: any

  public newSet: any


  constructor(public navCtrl: NavController, public modalController: ModalController, public toastController: ToastController, public alertController: AlertController, private _translate: TranslateService) { 
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

  async save(){

    if(this.checkEmpty() == true){
      const alert = await this.alertController.create({
        header: this._translate.instant('FillInput'),
        buttons: [
          {
              text: 'OK'
          }
      ]
      });
      await alert.present();
    }
    else{
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

    

  }

  checkEmpty(){

    if(this.title == "" || this.title == undefined || this.title == null){
      return true
    }

    for(var i = 0; i < this.cards.length; i++){
      if(this.cards[i].term == undefined || this.cards[i].term == null || this.cards[i].term == "" || this.cards[i].definition == undefined || this.cards[i].definition == null || this.cards[i].definition == ""){
        return true
      }
    }

    return false

  }

  dismiss(){
    this.modalController.dismiss();
  }

  async export(){
    if(this.checkEmpty() == true){
      const alert = await this.alertController.create({
        header: this._translate.instant('FillInput'),
        buttons: [
          {
              text: 'OK'
          }
      ]
      });
      await alert.present();
    }
    else{
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
          message: this.title + this._translate.instant('Clipboard'),
          duration: 2000
        });
        toast.present();
      }
    }
    
  }

  async import(){

    const alert = await this.alertController.create({
      header: this._translate.instant('Import'),
      inputs: [
        {
          name: 'code',
          type: 'text',
          placeholder: this._translate.instant('ImportCode')
        }
      ],
      buttons: [
        {
            text: this._translate.instant('Cancel')
        },
        {
            text: this._translate.instant('Save'),
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

  onKeydownEvent(event: KeyboardEvent): void {
    if (event.keyCode == 13) {
        const target = event.currentTarget as HTMLIonInputElement
        target.blur()
    }
  }

}
