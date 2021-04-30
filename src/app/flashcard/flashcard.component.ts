import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-flashcard',
  templateUrl: './flashcard.component.html',
  styleUrls: ['./flashcard.component.scss'],
})
export class FlashcardComponent implements OnInit {

  flipped: boolean = false;


  constructor() { }

  ngOnInit() {
  }

  flip(){
    this.flipped = !this.flipped;
  }

}
