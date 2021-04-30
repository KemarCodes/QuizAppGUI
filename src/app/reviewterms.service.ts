import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReviewtermsService {
  terms: any;
  constructor() { }

  public setTerms(data){
    this.terms = data;
  }

  public getTerms() {
    return this.terms;
  }
}
