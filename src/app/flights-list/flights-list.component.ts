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
x: Entry<any>[] = [];

  constructor(private router: Router, private contentful: ContentfulService) { }

  ngOnInit() {
    this.contentful.getProducts()
    
    .then(fl => {  
      this.flights = fl;
      this.x = this.flights.filter(flight => flight.fields.departure == "Toronto" );
      console.log(this.x)
    })    
    .then( ()=>console.log(this.flights));

    //console.log(this.flights);   
  }

  onClick(){
    //console.log(this.flights);

  }

}
