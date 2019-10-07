import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-practice',
  templateUrl: './practice.page.html',
  styleUrls: ['./practice.page.scss'],
})
export class PracticePage implements OnInit {

  public practiceSet: any

  constructor(public modalController: ModalController) { 
  }

  ngOnInit() {
    this.practiceSet.cards = this.shuffle(this.practiceSet.cards)
  }

  dismiss(){
    this.modalController.dismiss()
  }

  submit(){
    for(var i = 0; i < this.practiceSet.cards.length; i++){
      if(this.practiceSet.cards[i].answerTerm != undefined && this.practiceSet.cards[i].answerTerm.toUpperCase() === this.practiceSet.cards[i].term.toUpperCase()){
        //console.log("RIGHT")
        this.practiceSet.cards[i].answerColor = "success"
      }
      else{
        //console.log("WRONG")
        this.practiceSet.cards[i].answerColor = "danger"
      }
      if(this.practiceSet.cards[i].answerTerm == undefined || this.practiceSet.cards[i].answerTerm == null){
        //console.log("WRONG")
        this.practiceSet.cards[i].answerColor = "danger"
      }
    }
  }

  clear(){
    for(var i = 0; i < this.practiceSet.cards.length; i++){
      delete this.practiceSet.cards[i].answerTerm
      delete this.practiceSet.cards[i].answerColor
    }
  }

  shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

}
