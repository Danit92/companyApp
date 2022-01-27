import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private usersUrl = 'api/users';

  isLogged$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);


  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string): Observable<User> {
    let data: User;
    return this.http.get<User[]>(this.usersUrl).pipe(
      map((users) => {
        users.some((user) => {
          if (user.username === username.trim() && user.password === password.trim()){
            data = user;
          }
        });
        this.isLogged$.next(true);
        return data;
      }),
      catchError(this.handleError<User>('login'))
    );
  }

  logout(): void{
    this.isLogged$.next(false);
    this.router.navigate(['/'])
  }

  isLogged(): Observable<boolean>{
    return this.isLogged$;
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(`${operation} failed: ${error}`);
      return of(result as T);
    };
  }
}
