import { Component, OnInit } from '@angular/core';
import { Router }  from '@angular/router';
import { ContentfulService} from '../contentful.service';
import { Entry } from 'contentful';
import { DataService } from '../data.service';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
//import 'rxjs/add/operator/filter';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {map} from 'rxjs/operators';
import {filter} from 'rxjs/operators';
import {tap} from 'rxjs/operators';
import {Blog} from '../blog';


@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent implements OnInit {

  blogs: Entry<any>[] = [];
 // blogs1: Observable<Blog[]>;
  blogs1: any;
  authors: any;
  res: String = '';
  name: any;
  authorId: any;
  blogsCollection: any;
  blogsArray: any;
  blogsAuthors: any;
  currentAuthor: String = '';
  authorImagePath: String;
  picture: any;

  src: String = '../assets/';

  form: FormGroup;
  
  author_name = new FormControl("", Validators.required); 
  result: Observable<Blog[]>;

  constructor(private router: Router, 
    private contentful: ContentfulService, 
    private data: DataService,
    private fb: FormBuilder) { }

  ngOnInit() {
    //Getting blogs from Contentful by Promises
    this.contentful.getBlogs()
      .then(blog=> this.blogs = blog)     
      .then(()=> console.log(this.blogs));

    // Getting blogs from Contentful by Observables
      this.data.getAllBlogs()
      .subscribe(
        data=>{
          this.blogs1 = data;
          console.log(this.blogs1);
        })

    // Getting authors from Contentful by Observables
      this.data.getAllAuthors().subscribe(data1=>{
        this.authors = data1;
        //console.log("Authors list " + this.authors.items[0].sys.id);
        console.log("Authors list " + this.authors.items[0].sys);
      })

    // Initialize the form
      this.form = this.fb.group({        
        "name": this.author_name          
     });

    // When form changes
     this.form.valueChanges
        .pipe(
          debounceTime(400),
          distinctUntilChanged(),
        tap( val => {
          this.authorId = '';
          console.log(val)
        }),
        map(val => {
          if(val.name == "") {
            this.blogsCollection = [];
            this.currentAuthor = '';
          } else             
            this.blogsCollection = this.getBlogsByAuthorName(val)   
        })
     )
     .subscribe(
       val=> {     
         this.name = val;   
         console.log(val);    
         //console.log(this.blogsCollection)   
       })
   
   } 

  /*getAuthorId(name){
    let id = this.data.getAuthorIdByName(name.valueOf());
    return id;
  }*/

  getAuthorIdByName(input) {
    var list = this.authors; 
    var val;

    if(list != undefined || input !='') {    
       for (let i=0; i< list.items.length; i++){ 
         if (Object.values(input)[0] != undefined)  val = Object.values(input)[0];
        if( list.items[i].fields.name.toLowerCase().startsWith(val.toLowerCase())) {            
           this.authorId = list.items[i].sys.id;
           break;
        } 
       }
       return this.authorId;
    }
  } 

  // Getting Author's blogs
  getBlogsByAuthorName(name){

    var blogs: Array<Blog> = [];
    let id = this.getAuthorIdByName(name);
    this.blogsArray = Object.values(this.authors.includes);
    this.blogsAuthors = this.authors.items;

    if (id != '') {           
      /*var ss = blogsAuthors.filter(ba => {
        ba.sys.id = id,
        console.log(ss)
      })*/
      this.blogsAuthors.forEach(author => {
        if(author.sys.id == id){         
            author.fields.blog.forEach( blog=> {
              var blogId = blog.sys.id;
               let x = this.blogsArray;
               let picked = x[0].filter(x=>x.sys.id == blogId)
               if(picked.length != 0) {
                 let bl = new Blog();
                    bl.name = picked[0].fields.name;
                    bl.created = picked[0].fields.created;
                    bl.description = picked[0].fields.description.content[0].content[0].value;
                    bl.author = author.fields.name;
                    // ID of embedded body
                   let bodyId = picked[0].fields.bodyText[0].sys.id;
//                    REFERENCE to Embedded body
                   let bodyObj = x[0].filter(z=> z.sys.id == bodyId);

                    bl.body = bodyObj[0].fields.bodyText;
                  blogs.push(bl);
                  this.authorImagePath = this.src + author.fields.imagePath;
               }             
            })    
             this.currentAuthor = author.fields.name;     
             console.log(author.fields);
             this.picture = author.fields.picture;
        }
      })
    } else this.currentAuthor = '';   
    return blogs;
  }


}
