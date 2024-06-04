import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiCallService } from '../../services/api-call.service';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrl: './book-form.component.css'
})
export class BookFormComponent implements OnInit {

  bookId: string = "";
  isNewBook: boolean = false;
  isSaveSuccessful: boolean = false;
  // bookData: any;
  bookData = {
    isbn: 0,
    title: { value: '', lang: 'en' },
    author: '',
    category: '',
    cover: '',
    year: 0,
    price: 0.0
  };
  // bookData: any = { id: 0, name: '', email: '', password: '' };
  
  idValue: number | undefined;
  yearValue: number | undefined;
  priceValue: number | undefined;
  titleValue: string = '';
  authorValue: string = '';
  catergoryValue: string = '';
  coverValue: string = '';
  isButtonDisabled: boolean = false;

  constructor(
    private apiCall: ApiCallService,
    private route: ActivatedRoute,
    private router: Router,
    private appComponent: AppComponent) {
    this.appComponent.showButton = true;
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.bookId = params['id'];
        let selectedBookId = parseInt(this.bookId, 10);
        this.getBookDetails(selectedBookId);
      } else {
        this.isNewBook = true;
      }
    });
  }

  getBookDetails(selectedBookId: number): void {
    this.apiCall.GetBookById(selectedBookId).subscribe(
      (book) => {
        if (book != undefined) {
          this.bookData = book;
        }
      }
    );
  }

  AddNewBook(form: any){
    console.log("add new book: ")
    if (form.valid) {
      this.isButtonDisabled = true;
      const newBook = {
        isbn: this.idValue,
        title: {
          value: this.titleValue,
          lang: "en"
        },
        author: [this.authorValue],
        category: this.catergoryValue,
        cover: this.coverValue,
        year: this.yearValue,
        price: this.priceValue
      };

      this.apiCall.AddNewBook(newBook).subscribe(
        response => {
          setTimeout(() => {
            this.isSaveSuccessful = response;
            setTimeout(() => {
              this.router.navigate([`/allBooks`]);
            }, 2000);
          }, 1000);
        });
      }
  }


  UpdateBook(form: any) {
    console.log("edit book: ")
    if (form.valid) {
      const updatedBook = {
        isbn: this.bookData.isbn,
        title: {
          value: this.bookData.title.value,
          lang: 'en'
        },
        author: this.bookData.author,
        category: this.bookData.category,
        cover: this.bookData.cover,
        year: this.bookData.year,
        price: parseFloat(this.bookData.price.toString())
      };

      this.apiCall.EditBook(this.bookData.isbn, updatedBook).subscribe(
        response => {
          setTimeout(() => {
             //this.isSaveSuccessful = response;
            setTimeout(() => {
              this.router.navigate([`/allBooks`]);
            }, 2000);
          }, 1000);
        });
      }
  }
}
