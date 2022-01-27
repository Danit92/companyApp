import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  loginFailed: boolean = false;

  constructor(private router: Router, private auth: AuthenticationService) {}

  ngOnInit(): void {
    
  }

  onSubmit(): void {
    this.auth
      .login(
        this.loginForm.get('username')?.value,
        this.loginForm.get('password')?.value
      )
      .subscribe((data) => {
        if (data) {
          this.router.navigate([`/homepage`, data.id]);
        } else {
          this.loginFailed = true;
        }
      });
  }
}
