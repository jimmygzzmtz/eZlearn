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
  public selectedTerm:any;
  public enemyAttack: any;

  public playerAttack: any;

  public enemyList: any = [{name: "Rat", hp: 25, chance: 0.40}, {name: "Black Knight", hp: 500, chance: 0.05}, 
  {name: "Zombie", hp: 200, chance: 0.10}, {name: "Wolf", hp: 100, chance: 0.15}, {name: "Goblin", hp: 75, chance: 0.20}, {name: "Dark Wizard", hp: 200, chance: 0.10}]

  public newExp: any;

  constructor(public modalController: ModalController, public alertController: AlertController) { 
    
  }

  ngOnInit() {
    //console.log(this.enemyList)

    var randEnemyNum = Math.floor((Math.random() * 100) + 1)

    if (randEnemyNum >= 0 && randEnemyNum <= 40) {
      this.enemyName = "Rat"
      this.enemyHP = 25
    }

    if (randEnemyNum >= 41 && randEnemyNum <= 45) {
      this.enemyName = "Black Knight"
      this.enemyHP = 500
    }

    if (randEnemyNum >= 46 && randEnemyNum <= 55) {
      this.enemyName = "Zombie"
      this.enemyHP = 200
    }

    if (randEnemyNum >= 56 && randEnemyNum <= 70) {
      this.enemyName = "Wolf"
      this.enemyHP = 100
    }

    if (randEnemyNum >= 71 && randEnemyNum <= 90) {
      this.enemyName = "Goblin"
      this.enemyHP = 75
    }

    if (randEnemyNum >= 91 && randEnemyNum <= 100) {
      this.enemyName = "Dark Wizard"
      this.enemyHP = 200
    }

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
