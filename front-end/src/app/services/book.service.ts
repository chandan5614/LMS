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
    return this.http.post<any>(this.apiUrl, book);
  }

  addCopyToBook(bookId: string, copy: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${bookId}/add_copy`, copy);
  }

  updateBook(book: any): Observable<Book> {
    return this.http.post<Book>(this.apiUrl, book);
  }

  deleteBook(bookId: string): Observable<void> {
    const url = `http://127.0.0.1:8080/books/${bookId}`;
    return this.http.delete<void>(url);
  }

  borrowBook(transaction: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/borrow`, transaction);
  }

  returnBook(transaction: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/return`, transaction);
  }
}
