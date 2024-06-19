// transaction.service.ts
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Transaction } from "../models/transaction.model";

@Injectable({
  providedIn: "root",
})
export class TransactionService {
  private apiUrl = "http://127.0.0.1:8080";

  constructor(private http: HttpClient) {}

  getUserTransactions(): Observable<Transaction[]> {
    const userDataString: string | null = localStorage.getItem("userData");

    if (userDataString === null) {
      // Handle the case when userDataString is null (user data not found)
      console.error("User data not found in localStorage");
      return new Observable<Transaction[]>(); // Return an empty observable or handle appropriately
    }

    const userData = JSON.parse(userDataString);
    const user_id = userData.userId;
    const url = `${this.apiUrl}/users/${user_id}/transactions`;
    return this.http.get<Transaction[]>(url);
  }

  getAllTransactions(): Observable<Transaction[]> {
    const url = `${this.apiUrl}/transactions`;
    return this.http.get<Transaction[]>(url);
  }
}
