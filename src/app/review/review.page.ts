import { Component, OnInit } from '@angular/core';
import { ReviewtermsService } from '../reviewterms.service';


@Component({
  selector: 'app-review',
  templateUrl: './review.page.html',
  styleUrls: ['./review.page.scss'],
})
export class ReviewPage implements OnInit {
  terms: any;
  constructor(public reviewtermsService: ReviewtermsService) { }

  ngOnInit() {
    this.terms = this.reviewtermsService.getTerms();
  }

}
