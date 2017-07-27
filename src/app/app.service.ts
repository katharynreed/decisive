import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class RestaurantService {

  authToken = "";
  restaurant = "";
  searchIndex;

  constructor(private http: Http) { }


  logError(err) {
    console.error('There was an error: ' + err);
  }

  authenticateRequest() {

    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    let creds = 'target=https://api.yelp.com/oauth2/token\?&grant_type=client_credentials&client_id=-mhNHaAwsf81FvISIHKDeg&client_secret=UWxCCRzlh3sUBuWBvl5w8c6VDHHocE83VZl0r9oLropGTrUutWtEsiKeIC5y3fzp';

    this.http.post('http://localhost:8888/api.php?', creds, {headers: headers})
      .map(res => res.json())
      .subscribe(
        data => this.saveJwt(data.access_token),
        err => this.logError(err),
        () => this.getRestaurants()
      );
    }

    getRestaurants() {
      let headers = new Headers();
      headers.append('Authorization', 'Bearer ' + this.authToken);

      let creds = 'target=https://api.yelp.com/v3/businesses/search\?&location=portland&term=restaurant'

      this.randomizeSearchIndex();
      this.http.get(
        'http://localhost:8888/api.php?' + creds,
        {headers: headers}
      )
      .map(res => res.json())
      .subscribe(
        data => this.returnRestaurant(data["businesses"][this.randomizeSearchIndex()]["name"]),
        // data => console.log(data),
        err => this.logError(err),
        () => console.log("it worked again!")
      );
    }

    returnRestaurant(res) {
      console.log(res);
    }

    randomizeSearchIndex() {
      this.searchIndex = Math.floor(Math.random() * (20 - 0)) + 0;
      console.log(this.searchIndex);
      return this.searchIndex;
    }


  saveJwt(jwt) {
    if(jwt) {
      console.log("HERE! JWT")
      this.authToken = jwt;
      localStorage.setItem('access_token', jwt)
      console.log(jwt)
    }
  }
}
