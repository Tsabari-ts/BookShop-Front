import { Component, OnInit } from '@angular/core';
import { ApiCallService } from '../../services/api-call.service';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css'
})
export class BookListComponent implements OnInit {

  books: any;
  constructor(private apiCall: ApiCallService,
    private appComponent: AppComponent) {
    this.appComponent.showButton = true;
  }

  ngOnInit(): void {
    this.GetAllUsers();
  }

  GetAllUsers(): void {
    this.apiCall.GetAllBooks().subscribe(
      (data) => {
        this.books = data;;
      }
    );
  }
}
