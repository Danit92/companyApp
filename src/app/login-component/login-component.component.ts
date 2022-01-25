import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css'],
})
export class LoginComponentComponent implements OnInit {
  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
  loginFailed = false;

  constructor(private router: Router, private auth: AuthenticationService) {}

  ngOnInit(): void {
    if (window.sessionStorage.getItem('id')) {
      this.router.navigateByUrl(`/homepage`);
    }
  }

  onSubmit(): void {
    this.auth
      .login(
        this.loginForm.get('username')?.value,
        this.loginForm.get('password')?.value
      )
      .subscribe((data) => {
        if (data) {
          window.sessionStorage.setItem('id', data.id.toString());
          this.router.navigateByUrl(`/homepage`);
        } else {
          console.log('Username o password errati');
        }
      });
  }
}
