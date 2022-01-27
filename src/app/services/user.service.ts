import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userUrl = '/api/users';

  constructor(private http: HttpClient) {}

  getUser(id: number): Observable<User> {
    return this.http
      .get<User>(`${this.userUrl}/${id}`)
      .pipe(catchError(this.handleError<User>('getUser')));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${JSON.stringify(error)}`);
      return of(result as T);
    };
  }
}
