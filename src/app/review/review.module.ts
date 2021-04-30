import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReviewPageRoutingModule } from './review-routing.module';
import { FlashcardComponent } from '../flashcard/flashcard.component';


import { ReviewPage } from './review.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReviewPageRoutingModule
  ],
  declarations: [ReviewPage, FlashcardComponent]
})
export class ReviewPageModule {}
