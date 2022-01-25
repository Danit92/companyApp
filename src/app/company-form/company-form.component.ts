import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Company } from '../models/company';
import { CompanyService } from '../services/company.service';

@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.css'],
})
export class CompanyFormComponent implements OnInit {
  @Output() itemEvent = new EventEmitter<Company>();
  companyForm!: FormGroup;

  constructor(private companyService: CompanyService) {}

  ngOnInit(): void {
    this.companyForm = new FormGroup({
      name: (new FormControl('', Validators.required)),
      address: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      revenue: new FormControl('', Validators.required),
    });
  }

  onSubmit(): void {
    this.companyService.addCompany(this.companyForm.value).subscribe({
      next: (res) => console.log(res),
      error: (err) => console.log(err),
      complete: () => console.log('complete'),
    });

  }
}
