import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class RestaurantService {

  authToken = "";
  restaurant;
  restaurantWebsite;
  restaurantPrice;
  restaurantRating;
  restaurantCategory;
  searchIndex;
  data;
  restaurantsPromise;
  randomIndices = [];

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
        // () => this.getRestaurants()
      );
    }

    getRestaurants(location) {
      let headers = new Headers();
      headers.append('Authorization', 'Bearer ' + this.authToken);

      let creds = 'target=https://api.yelp.com/v3/businesses/search\?&location=' + location + '&term=restaurant';

      return this.http.get(
        'http://localhost:8888/api.php?' + creds,
        {headers: headers}
      )
      .toPromise()
      .then(this.returnRestaurant.bind(this));
    }

    returnRestaurant(res) {
      res = res.json();
      this.data = res;
      let searchInt = this.randomizeSearchIndex();
      this.restaurant = res['businesses'][searchInt]['name'];
      this.returnRestaurantWebsite(res, searchInt);
      this.returnRestaurantRating(res, searchInt);
      this.returnRestaurantPrice(res, searchInt);
      this.returnRestaurantCategory(res, searchInt);
      return res;
    }

    returnRestaurantRating(res, int) {
      this.restaurantRating = res['businesses'][int]['rating'];
    }

    returnRestaurantPrice(res, int) {
      this.restaurantPrice = res['businesses'][int]['price'];
    }

    returnRestaurantCategory(res, int) {
      this.restaurantCategory = res['businesses'][int]['categories'][0]['title'];
    }

    returnRestaurantWebsite(res, int) {
      this.restaurantWebsite = res['businesses'][int]['url'];
    }

    randomizeSearchIndex() {
      const randCeiling = 20;
      if (this.randomIndices.length == randCeiling) {
        this.randomIndices = [];
      }

      this.searchIndex = Math.floor(Math.random() * (randCeiling - 0)) + 0;

      while (this.randomIndices.includes(this.searchIndex)) {
        this.searchIndex = Math.floor(Math.random() * (randCeiling - 0)) + 0;
      }
      if (!this.randomIndices.includes(this.searchIndex)) {
        this.randomIndices.push(this.searchIndex);
      }

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
