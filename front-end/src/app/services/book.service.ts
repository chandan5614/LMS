// book.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, tap, throwError } from 'rxjs';
import { Book, Copy } from '../models/book.model';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private apiUrl = 'http://127.0.0.1:8080/books';

  constructor(private http: HttpClient) {}

  getAllBooks(filter?: string): Observable<any> {
    const url = `${this.apiUrl}`;
    const params = filter ? { filter } : {};
    return this.http.get(url, { params: params as HttpParams }).pipe(
      tap((response) => {
        console.log('Books - service:', response);
      })
    );
  }
  
  getAllAvailableBooks(filter?: string): Observable<any> {
    const url = `${this.apiUrl}/available`;
    const params = filter ? { filter } : {};
    return this.http.get(url, { params: params as HttpParams }).pipe(
      tap((response) => {
        console.log('Books - service:', response);
      })
    );
  }

  getBookById(bookId: string): Observable<Book> {
    const url = `${this.apiUrl}/${bookId}`;
    return this.http.get<Book>(url);
  }

  addBook(book: any): Observable<Book> {
    const url = `http://127.0.0.1:8080/admin/books`;
    return this.http.post<any>(url, book);
  }

  updateBook(book: any): Observable<Book> {
    const url = `http://127.0.0.1:8080/admin/books`;
    return this.http.post<Book>(url, book);
  }

  deleteBook(bookId: string): Observable<void> {
    const url = `http://127.0.0.1:8080/admin/books/${bookId}`;
    return this.http.delete<void>(url);
  }

  getAllLibraries(): Observable<any> {
    const url = `http://127.0.0.1:8080/libraries/all`;
    return this.http.get<Book[]>(url);
  }

  borrowBook(transaction: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/borrow`, transaction);
  }  

  checkoutBooks(books: Book[]): Observable<any> {
    // Customize the API endpoint and payload according to your server implementation
    const checkoutUrl = `${this.apiUrl}/checkout`;

    // Assuming your server expects an array of book IDs
    const bookIds = books.map((book) => book._id);

    return this.http.post(checkoutUrl, { bookIds });
  }
  
  borrowBooks(books: Book[]): Observable<any> {
    // Customize the API endpoint and payload according to your server implementation
    const borrowUrl = `${this.apiUrl}/borrow`;

    // Assuming your server expects an array of book IDs
    const bookIds = books.map((book) => book._id);

    return this.http.post(borrowUrl, { bookIds });
  }
}
