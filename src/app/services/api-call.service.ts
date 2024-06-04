import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiCallService {

  constructor(private http:HttpClient) { }

  GetAllBooks() {
    return this.http.get<any>(`https://localhost:7189/BookShop/GetAllBooks`);
  }

  GetBookById(bookId:number) {
    return this.http.get<any>(`https://localhost:7189/BookShop/GetBookDataByBookId/${bookId}`);
  }

  AddNewBook(bookData:any){
    return this.http.post<any>(`https://localhost:7189/BookShop/AddBook/`, bookData);
  }

  EditBook(bookId:number, updatedBook:any){
    return this.http.put<any>(`https://localhost:7189/BookShop/EditBook/${bookId}`, updatedBook);
  }

  DeleteBookById(bookId:number){
    return this.http.delete<any>(`https://localhost:7189/BookShop/DeleteBook/${bookId}`);
  }
}
