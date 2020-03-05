import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Blog} from './blog';
//import { Observable } from 'rxjs';
//import {map} from 'rxjs/internal/operators';
//import {filter} from 'rxjs/internal/operators';
import {filter, map} from 'rxjs/operators';
import { Author} from './author';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  
    space: String = 'l1csff5di73h';
    accessToken: String = '23383dd6f04a18a0f3977005a07b1970253a47165819c274998a8233763d811f';  

    results: Blog[];
    res: any;
    authorId: any;


  constructor(private http: HttpClient) { }

  getAllBlogs() {    
    return this.http.get('https://cdn.contentful.com/spaces/'+ this.space + '/entries?access_token='+ this.accessToken +'&content_type=blog&include=1')
    /*
    .map(res=>{
      let results = res.json().results.map(item=>{
        return new Blog(
          //item.name,

        )
      })
    })*/
  }

  getBlogsByAuthorName(name){
    return this.http.get('https://cdn.contentful.com/spaces/'+ this.space + '/entries?access_token='+ this.accessToken +'&content_type=blog&include=1')
  }

  getAllAuthors() {
    return this.http.get('https://cdn.contentful.com/spaces/'+ this.space + '/entries?access_token='+ this.accessToken +'&content_type=author&include=3')
    
  }

  getAuthorIdByName(input) {
    var list;
    //var authorId;
    this.getAllAuthors()
    .subscribe(l => {
      list = l;
      console.log(list.items);
      var dd;
      
      if(list != undefined) {    
         for (let i=0; i< list.items.length; i++){
          dd = list.items[i].fields.name;
          if( dd == Object.values(input)[0]) {            
             this.authorId = list.items[i].sys.id;
             break;
          } 
         }
         return this.authorId;
      }
    })   
    

  }
}
