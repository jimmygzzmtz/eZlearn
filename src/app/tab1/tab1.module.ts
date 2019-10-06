import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { SetDetailPage } from '../set-detail/set-detail.page';
import { PracticePage } from '../practice/practice.page';
import { PlayPage } from '../play/play.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: Tab1Page }])
  ],
  declarations: [Tab1Page, SetDetailPage, PracticePage, PlayPage],
  entryComponents: [SetDetailPage, PracticePage, PlayPage]
})
export class Tab1PageModule {}
