import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { BookListComponent } from './components/book-list/book-list.component';
import { BookFormComponent } from './components/book-form/book-form.component';
import { BookDetailsComponent } from './components/book-details/book-details.component';

const routes: Routes = [
  {path:"",redirectTo:"home",pathMatch:"full"},
  {path:"home", component:HomeComponent},  
  {path:"allBooks", component:BookListComponent},
  {path:"book/new", component:BookFormComponent},
  {path:"book/edit/:id", component:BookFormComponent},
  {path:"book/:id", component:BookDetailsComponent},
  {path:"*",redirectTo:"home"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
