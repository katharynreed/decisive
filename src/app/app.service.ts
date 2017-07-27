import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class RestaurantService {

  constructor(private http: Http) { }

  logError(err) {
    console.error('There was an error: ' + err);
  }

  authenticateRequest() {

    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    let creds = 'grant_type=client_credentials&client_id=-mhNHaAwsf81FvISIHKDeg&client_secret=UWxCCRzlh3sUBuWBvl5w8c6VDHHocE83VZl0r9oLropGTrUutWtEsiKeIC5y3fzp';

    this.http.post('https://api.yelp.com/oauth2/token?', creds, {headers: headers})
      .map(res => res.json())
      .subscribe(
        data => this.saveJwt(data.access_token),
        err => this.logError(err),
        () => console.log("it worked")
      );
    }

    saveJwt(jwt) {
      if(jwt) {
        localStorage.setItem('access_token', jwt)
        console.log(jwt)
      }
    }
  }
