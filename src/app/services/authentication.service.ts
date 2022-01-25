import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private usersUrl = 'api/users';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<User> {
    let data: User;
    return this.http.get<User[]>(this.usersUrl).pipe(
      map((users) => {
        users.some((user) => {
          if (
            user.username === username.trim() &&
            user.password === password.trim()
          ) {
            data = user;
          }
        });
        return data;
      }),
      catchError(this.handleError<User>('login'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(`${operation} failed: ${error}`);
      return of(result as T);
    };
  }
}
