import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { CompanyService } from '../services/company.service';
import { Company } from '../models/company';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit {
  avatar = '';
  user!: User;
  companies!: Company[];

  constructor(
    private router: ActivatedRoute,
    private companyService: CompanyService,
    private userService: UserService,
    private authService: AuthenticationService
  ) {
    companyService.newCompany$.subscribe((company) =>
      this.companies.push(company)
    );
  }

  ngOnInit():void {
    this.getAvatar();
    this.getCompanies();
  }

  getAvatar(): void {
    const id = Number(this.router.snapshot.params['id']);
    console.log(id)
    this.userService
      .getUser(id)
      .subscribe(
        (user) =>
          (this.avatar =
            user.firstName.substring(0, 1) + user.lastName.substring(0, 1))
      );
  }

  getCompanies() {
    this.companyService
      .getCompanies()
      .subscribe((companies) => (this.companies = companies));
  }

  delete(company: Company): void {
    if (window.confirm('Do you want to remove this record?')) {
      this.companies = this.companies.filter((c) => c !== company);
      this.companyService.delete(company.id).subscribe();
    }
  }

  logout(): void {
    this.authService.logout()
    // window.sessionStorage.clear();
    // this.router.navigateByUrl('/login');
  }
}
