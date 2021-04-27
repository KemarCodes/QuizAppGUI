import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { StorageService, Item } from '../../storage.service';
import { TermsPage } from '../terms/terms.page';
import { Router } from '@angular/router';

@Component({
  selector: 'app-studysets',
  templateUrl: './studysets.page.html',
  styleUrls: ['./studysets.page.scss'],
})
export class StudysetsPage implements OnInit {

  SERVER_ADDRESS: string = 'http://localhost:5000';
  items: Item[] = [];

  constructor(private httpClient: HttpClient,
     public storage: StorageService,
     private router: Router) { }

  httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
  sets: any;

  ngOnInit() {
    this.retrieveStudySets();
    console.log("QuizAppGUI: ngOnInit")
  }

  retrieveStudySets(){
    let postData = {    
      "sessionToken": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzb21lIjoicGF5bG9hZCJ9.SsEpHy4UR5hXQZgll7PotCVuRSVN-dXa66YCcIRJdtY"
    }
    this.httpClient.post(`${this.SERVER_ADDRESS}/study/studysets`, postData, this.httpOptions)
    .subscribe(data => {
      console.log(data['studysets']);
      this.sets = data['studysets'];
    }, error => {
      console.log(error);
    });
  }

  openStudySet(value: number){
    console.log(value);
    this.router.navigate(['terms/'.concat(value.toString())]);
  }

/*   retrieveStudySets(){ 
    this.storage.getItems().then(items => {
      this.items = items;
     });
     console.log(this.items.toString());
    let postData = {    
      
    }
    this.httpClient.post(`${this.SERVER_ADDRESS}/study/studysets`, postData, this.httpOptions)
    .subscribe(data => {
      console.log(data['_body']);
    }, error => {
      console.log(error);
    });
  } */

}
