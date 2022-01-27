import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, MinLengthValidator, Validators } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { Company } from '../models/company';
import { CompanyService } from '../services/company.service';

@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.css'],
})
export class CompanyFormComponent implements OnInit {
  companyForm!: FormGroup;
  private url: string = 'api/companies';

  constructor(private companyService: CompanyService, private http: HttpClient) {}

  ngOnInit(): void {
    this.companyForm = new FormGroup({
      name: new FormControl('', [Validators.required], [this.invalidName.bind(this)]),
      address: new FormControl('', Validators.required),
      phone: new FormControl('', [Validators.required, Validators.minLength(7)]),
      revenue: new FormControl('', Validators.required),
    });
  }

  onSubmit(): void {
    this.companyService.addCompany(this.companyForm.value).subscribe();
    this.companyForm.reset()
  }

  // invalidPhoneNumber(control: FormControl): {[s: string]: boolean} | null{
  //   return isNaN(control.value) ? {'invalidPhoneNumber': true} : null
  // }

  invalidName(control: AbstractControl) : Observable<{[s: string]: boolean} | null>{
    return this.http.get<Company[]>(this.url).pipe(
      map(companies => {
        console.log(true)
        if(companies.some(comp => comp.name === control.value)){
         
          return {'nameAlreadyRegistered': true}
        }
        return null;
      })
    )
  }
}
