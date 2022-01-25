import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, of, Subject, tap } from 'rxjs';
import { Company } from '../models/company';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  private companiesUrl = '/api/companies';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application-java' }),
  };

  private newCompanySource = new Subject<Company>();
  newCompany$ = this.newCompanySource.asObservable();

  constructor(private http: HttpClient) {}

  getCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>(this.companiesUrl).pipe(
      catchError(this.handleError<Company[]>('getCompanies', []))
    );
  }

  addCompany(company: Company): Observable<Company> {
    return this.http
      .post<Company>(this.companiesUrl, company, this.httpOptions)
      .pipe(
        tap((company) => {
          this.newCompanySource.next(company);
        }),
        catchError(this.handleError<Company>('addCompany'))
      );
  }

  delete(id: number): Observable<Company> {
    const url = `${this.companiesUrl}/${id}`;
    return this.http.delete<Company>(url, this.httpOptions).pipe(
      tap(() => console.log(`deleted company: ${id}`)),
      catchError(this.handleError<Company>('delete company'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(`${operation} failed: ${error}`);
      return of(result as T);
    };
  }
}
