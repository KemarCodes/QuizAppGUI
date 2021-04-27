import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-studysets',
  templateUrl: './studysets.page.html',
  styleUrls: ['./studysets.page.scss'],
})
export class StudysetsPage implements OnInit {

  SERVER_ADDRESS: string = 'http://localhost:5000';
  token: any;

  constructor(private httpClient: HttpClient,
     private router: Router,
     private activatedRoute: ActivatedRoute) {
          this.token = this.activatedRoute.snapshot.paramMap.get('token');
      }

  httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
  sets: any;

  ngOnInit() {
    this.retrieveStudySets();
    console.log("QuizAppGUI: ngOnInit")
  }

  retrieveStudySets(){
    let postData = {    
      "sessionToken": this.token
    }
    this.httpClient.post(`${this.SERVER_ADDRESS}/study/studysets`, postData, this.httpOptions)
    .subscribe(data => {
      console.log(data['studysets']);
      this.sets = data['studysets'];
    }, error => {
      console.log(error);
    });
  }

  addStudySet(addStudySetForm){
    let postData = {    
      "sessionToken": this.token,
      "studySetName": addStudySetForm.value.newstudyset
    }
    this.httpClient.post(`${this.SERVER_ADDRESS}/study/newstudyset`, postData, this.httpOptions)
    .subscribe(data => {
      console.log(data['studysets']);
      this.sets = data['studysets'];
    }, error => {
      console.log(error);
    });
    addStudySetForm.reset();
  }



  openStudySet(value: number){
    console.log(value);
    this.router.navigate(['terms/'.concat(value.toString())]);
  }


}
