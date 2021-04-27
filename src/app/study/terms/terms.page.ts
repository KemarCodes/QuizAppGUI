import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.page.html',
  styleUrls: ['./terms.page.scss'],
})
export class TermsPage implements OnInit {

  SERVER_ADDRESS: string = 'http://localhost:5000';
  data: any;

  constructor(private httpClient: HttpClient, 
    private activatedRoute: ActivatedRoute) {
        this.data = this.activatedRoute.snapshot.paramMap.get('id');
     }

  httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
  terms: any;

  ngOnInit() {
    this.retrieveTerms();
  }

  retrieveTerms(){
    let postData = {    
      "studySetID": this.data
    }
    this.httpClient.post(`${this.SERVER_ADDRESS}/study/terms`, postData, this.httpOptions)
    .subscribe(data => {
      console.log(data['terms']);
      this.terms = data['terms'];
    }, error => {
      console.log(error);
    });
  }

  addTerm(addTermForm){
    let postData = {    
      "studySetID": this.data,
      "term": addTermForm.value.newterm,
      "description": addTermForm.value.newdescription
    }
    this.httpClient.post(`${this.SERVER_ADDRESS}/study/newterm`, postData, this.httpOptions)
    .subscribe(data => {
      console.log(data['terms']);
      this.terms = data['terms'];
    }, error => {
      console.log(error);
    });
    addTermForm.reset();
  }

  deleteTerm(value){
    console.log(value);
    let postData = {    
      "studySetID": this.data,
      "termID": value
    }
    this.httpClient.post(`${this.SERVER_ADDRESS}/study/deleteterm`, postData, this.httpOptions)
    .subscribe(data => {
      console.log(data['terms']);
      this.terms = data['terms'];
    }, error => {
      console.log(error);
    });
  }
 

}
