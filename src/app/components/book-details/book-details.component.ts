import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiCallService } from '../../services/api-call.service';
import { DialogService } from '../../services/dialog.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.css'
})
export class BookDetailsComponent implements OnInit {
  bookId: string = "";
  selectedBook: any | undefined;
  selectedBookId: number = 0;

  constructor(private apiCall: ApiCallService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private dialogService: DialogService,
    private appComponent: AppComponent) {
    this.appComponent.showButton = true;
  }


  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.bookId = params['id'];
      this.selectedBookId = parseInt(this.bookId, 10);
      this.GetBookDetails(this.selectedBookId);
    })
  }

  GetBookDetails(selectedBookId: number): void {
    this.apiCall.GetBookById(selectedBookId).subscribe(
      (book) => {
        if (book?.id !== 0) {
          this.selectedBook = book;
        }
        else {
          this.router.navigate([`/`]);
        }
      }
    );
  }

  EditBookDetails() {
    this.router.navigate([`/book/edit/${this.selectedBookId}`]);
  }

  DeleteBook() {
    const data = {
      additionalData: {
        selectedBookId: this.selectedBookId,
      },
    };
    this.dialogService.DeleteConfirmationDialog(data);
  }
}