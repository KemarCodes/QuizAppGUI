import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-studysets',
  templateUrl: './studysets.page.html',
  styleUrls: ['./studysets.page.scss'],
})
export class StudysetsPage implements OnInit {

  SERVER_ADDRESS: string = 'http://localhost:5000';

  constructor(private httpClient: HttpClient, public storage: Storage) { }

  httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};

  ngOnInit() {
    this.retrieveStudySets();
  }

  retrieveStudySets(){ 
    let postData = {
      "sessionToken" : this.storage.get("ACCESS_TOKEN")
    }
    this.httpClient.post(`${this.SERVER_ADDRESS}/study/studysets`, postData, this.httpOptions)
    .subscribe(data => {
      console.log(data['_body']);
    }, error => {
      console.log(error);
    });
  }

}
