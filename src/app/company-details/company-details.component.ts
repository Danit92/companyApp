import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { filter, fromEvent } from 'rxjs';
import { Company } from '../models/company';
import { CompanyService } from '../services/company.service';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.css'],
})
export class CompanyDetailsComponent implements OnInit {
  @Input() company!: Company;

  constructor(private companyService: CompanyService) {}

  ngOnInit(): void {}

  updateCompany() {}

}
