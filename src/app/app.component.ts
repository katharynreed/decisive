import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { RestaurantService } from '../app/app.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [RestaurantService]
})

export class AppComponent implements OnInit {

constructor(private RestaurantService: RestaurantService ){ }

restaurant;
restaurantWebsite;
restaurantRating;
restaurantCategory;
restaurantPrice;
clicked = false;
unclicked = true;
location;

  ngOnInit() {
    this.RestaurantService.authenticateRequest();
  }

  findARestaurant(location) {
    this.location = location;
    var restaurantPromise = this.RestaurantService.getRestaurants(location);
    restaurantPromise.then(function(result) {
      this.restaurant = this.RestaurantService.restaurant;
      this.restaurantWebsite = this.RestaurantService.restaurantWebsite;
      this.restaurantPrice = this.RestaurantService.restaurantPrice;
      this.restaurantRating = this.RestaurantService.restaurantRating;
      this.restaurantCategory = this.RestaurantService.restaurantCategory;
      this.clicked = true;
      this.unclicked = false;
    }.bind(this));
  }

  findNewRestaurant() {
    var restaurantPromise = this.RestaurantService.getRestaurants(this.location);
    restaurantPromise.then(function(result) {
      this.restaurant = this.RestaurantService.restaurant;
      this.restaurantWebsite = this.RestaurantService.restaurantWebsite;
      this.restaurantPrice = this.RestaurantService.restaurantPrice;
      this.restaurantRating = this.RestaurantService.restaurantRating;
      this.restaurantCategory = this.RestaurantService.restaurantCategory;
    }.bind(this));
  }
}
