import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  lang: any;
  darkOpt: any;

  constructor(private _translate: TranslateService, public alertController: AlertController, private storage: Storage) {

  }

  async installPrompt(){
    const alert = await this.alertController.create({
      header: this._translate.instant('Install'),
      message: this._translate.instant('InstallGuideiOS') + this._translate.instant('InstallGuideAndroid') + this._translate.instant('InstallGuideDesktop'),
      buttons: [
        {
            text: 'OK'
        }
    ]
    });

    await alert.present();
  }

  ngOnInit() {
    this.darkOpt = document.getElementById("darkOptSettings")
    this.storage.get('darkMode').then((val) => {
      this.darkOpt.value = val
      this.selectDarkTheme()
    });

    this.storage.get('lang').then((val) => {
      this.lang = val
    });
  }

  selectDarkTheme(){
    if(this.darkOpt.value == 'system'){
      document.body.classList.toggle('dark', (window.matchMedia('(prefers-color-scheme: dark)').matches))
      this.storage.set('darkMode', this.darkOpt.value);
    }
    if(this.darkOpt.value == 'on'){
      document.body.classList.add('dark')
      this.storage.set('darkMode', this.darkOpt.value);
    }
    if(this.darkOpt.value == 'off'){
      document.body.classList.remove('dark')
      this.storage.set('darkMode', this.darkOpt.value);
    }
  }

  switchLang(lang){
    this._translate.use(lang);
    this.storage.set('lang', lang);
  }

  async clearStorage() {
    const alert = await this.alertController.create({
      header: this._translate.instant('ClearSt'),
      message: this._translate.instant('ConfirmClear'),
      buttons: [
        {
            text: this._translate.instant('Cancel')
        },
        {
            text: 'OK',
            handler: data => {
              this.storage.clear()
              document.location.href = "";
            }
        }
    ]
    });

    await alert.present();
  }

}
