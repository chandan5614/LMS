import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BranchService {
  private apiUrl = 'http://127.0.0.1:8080/branches';

  constructor(private http: HttpClient) { }

  getBranches(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getBranchById(branchId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${branchId}`);
  }

  addBranch(branch: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, branch);
  }

  updateBranch(branchId: string, branch: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${branchId}`, branch);
  }

  deleteBranch(branchId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${branchId}`);
  }
}
