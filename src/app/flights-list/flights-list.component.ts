import { Component, OnInit } from '@angular/core';
import { Router }  from '@angular/router';
import { ContentfulService} from '../contentful.service';
import { Entry } from 'contentful';

@Component({
  selector: 'app-flights-list',
  templateUrl: './flights-list.component.html',
  styleUrls: ['./flights-list.component.scss']
})
export class FlightsListComponent implements OnInit {

flights: Entry<any>[] = [];

  constructor(private router: Router, private contentful: ContentfulService) { }

  ngOnInit() {
    this.contentful.getProducts()
    .then(flights => this.flights = flights);

    console.log(this.flights);
  }
  
  
}
