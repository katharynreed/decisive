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

  ngOnInit() {
    this.RestaurantService.authenticateRequest();
  }

  findARestaurant() {
    this.clicked = true;
    this.unclicked = false;
    this.RestaurantService.getRestaurants();
    this.restaurant = this.RestaurantService.restaurant;
    this.restaurantWebsite = this.RestaurantService.restaurantWebsite;
    this.restaurantPrice = this.RestaurantService.restaurantPrice;
    this.restaurantRating = this.RestaurantService.restaurantRating;
    this.restaurantCategory = this.RestaurantService.restaurantCategory;
    console.log(this.restaurantCategory);
    console.log(this.restaurant);
    return this.restaurant;
  }
}
