import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { CompanyService } from '../services/company.service';
import { Company } from '../models/company';

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
    private router: Router,
    private companyService: CompanyService,
    private userService: UserService
  ) {
    companyService.newCompany$.subscribe((company) =>
      this.companies.push(company)
    );
  }

  ngOnInit(): void {
    if (!window.sessionStorage.getItem('id')) {
      this.router.navigateByUrl('/login');
    }
    this.getAvatar();
    this.getCompanies();
  }

  getAvatar(): void {
    const id = Number(window.sessionStorage.getItem('id'));
    this.userService
      .getUser(id)
      .subscribe(
        (user) =>
          (this.avatar =
            user.firstName.substring(0, 1) + user.lastName.substring(0, 1))
      );
  }

  getCompanies(): void {
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
    window.sessionStorage.clear();
    this.router.navigateByUrl('/login');
  }
}
