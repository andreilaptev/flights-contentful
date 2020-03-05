import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FlightsListComponent } from 'src/app/flights-list/flights-list.component';
import { BlogsComponent } from './blogs/blogs.component';

const routes: Routes = [
  { path: '', redirectTo: '/flights', pathMatch: 'full' },
  { path: 'flights',  component: FlightsListComponent },
  { path: 'blogs',  component: BlogsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
