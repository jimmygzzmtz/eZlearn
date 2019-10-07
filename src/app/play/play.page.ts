import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-play',
  templateUrl: './play.page.html',
  styleUrls: ['./play.page.scss'],
})
export class PlayPage implements OnInit {

  public playSet: any;
  public questStats: any;

  public enemyName: any;
  public enemyHP: any;
  //public enemyLevel: any;
  public selectedTerm: any;
  public selectedEnemy: any;
  public enemyAttack: any;

  public playerAttack: any;

  public enemyList: any = [{name: "Rat", hp: 25}, {name: "BlackKnight", hp: 500}, {name: "Zombie", hp: 200}, 
  {name: "Wolf", hp: 100}, {name: "Goblin", hp: 75}, {name: "DarkWizard", hp: 200}]

  public newExp: any;

  constructor(public modalController: ModalController, public alertController: AlertController) { 
    
  }

  ngOnInit() {
    //console.log(this.enemyList)

    this.selectedEnemy = this.enemyList[Math.floor((Math.random() * this.enemyList.length))]
    this.enemyName = this.selectedEnemy.name
    this.enemyHP = this.selectedEnemy.hp

    this.selectedTerm = this.playSet.cards[Math.floor((Math.random() * this.playSet.cards.length))]
    this.enemyAttack = this.selectedTerm.definition

    this.newExp = this.questStats.exp + this.enemyHP/10

    //randomly choose enemy and attack from list
    //enemy from list has name and hp, exp at the end is given based on hp
    //attack is chosen from set every turn
  }

  dismiss(){
    this.modalController.dismiss()
  }

  async attack(){
    if(this.playerAttack != undefined && this.playerAttack.toUpperCase() === this.selectedTerm.term.toUpperCase()){
      //console.log("attack success")
      var attackPower = this.questStats.level*10
      this.enemyHP = this.enemyHP - attackPower
    }
    else{
      //console.log("attack fail")
      var attackPower = this.enemyHP/10
      this.questStats.hp = this.questStats.hp - attackPower
    }
    if(this.playerAttack == undefined || this.playerAttack == null){
      //console.log("attack fail")
      var attackPower = this.enemyHP/10
      this.questStats.hp = this.questStats.hp - attackPower
    }
    this.selectedTerm = this.playSet.cards[Math.floor((Math.random() * this.playSet.cards.length))]
    this.enemyAttack = this.selectedTerm.definition

    if(this.enemyHP <= 0){
      //console.log("win")

      this.enemyHP = 0

      const alert = await this.alertController.create({
        header: 'You won!',
        buttons: [
          {
              text: 'OK',
              handler: () => {
                //exp to send is equals to newexp
                console.log("new exp is " + this.newExp)

                //add exp
                //if exp > 100, level + 1 and exp - 100
                //world + 1

                if(this.newExp >= 100){
                  this.newExp = this.newExp - 100
                  this.questStats.level = this.questStats.level + 1
                  this.questStats.hp = this.questStats.hp + 10
                }

                this.questStats.exp = this.newExp
                this.questStats.world = this.questStats.world + 1

                this.modalController.dismiss(this.questStats)
                
              }
          }
      ]
      });
  
      await alert.present();
    }
    if(this.questStats.hp <= 0){
      //console.log("lose")

      this.questStats.hp = 0

      const alert = await this.alertController.create({
        header: 'You lost...',
        buttons: [
          {
              text: 'OK',
              handler: () => {
                this.dismiss()
              }
          }
      ]
      });
  
      await alert.present();
    }

    this.playerAttack = ""
  }

}
