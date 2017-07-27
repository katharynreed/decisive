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

ngOnInit() {
  this.RestaurantService.authenticateRequest();
}



}
