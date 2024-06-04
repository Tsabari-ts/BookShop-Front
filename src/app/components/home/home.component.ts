import { Component, OnInit } from '@angular/core';
import { ApiCallService } from '../../services/api-call.service';
import { Router } from '@angular/router';
import { DialogService } from '../../services/dialog.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  books: any;
  selectedBookId: number | undefined;
  error: boolean = false;
  errorMessage: string = "";

  constructor(private apiCall: ApiCallService,
    private dialogService: DialogService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.GetBooksData();
  }

  GetBooksData(): void {
    this.apiCall.GetAllBooks().subscribe(
      (data) => {
        this.books = data;;
      }
    );
  }

  GetBookId() {
    if (this.books !== undefined) {
      this.apiCall.GetAllBooks().subscribe(
        (data) => {
          this.books = data;
        },
        (error) => {
          this.errorMessage = 'There was an error fetching the data, please try again later';
        }
      );
    }
  }

  GetAllBooks() {
    this.router.navigate([`/allBooks`]);
  }

  AddNewBook() {
    this.router.navigate([`/book/new`]);
  }

  GetBookDetails(): void {
    if (this.selectedBookId !== undefined) {
      this.router.navigate([`/book/${this.selectedBookId}`]);
    }
    else {
      this.NoBookSelected();
    }
  }

  EditBookDetails() {
    if (this.selectedBookId !== undefined) {
      this.router.navigate([`/book/edit/${this.selectedBookId}`]);
    }
    else {
      this.NoBookSelected();
    }
  }

  DeleteBook() {
    if (this.selectedBookId !== undefined) {
      let selectedBookId = + this.selectedBookId;
      const data = {
        additionalData: {
          selectedBookId: selectedBookId,
        },
      };
      this.dialogService.DeleteConfirmationDialog(data);
    }
    else {
      this.NoBookSelected();
    }
  }

  NoBookSelected() {
    this.error = true;
    this.errorMessage = "Please select a book ID";
  }
}
