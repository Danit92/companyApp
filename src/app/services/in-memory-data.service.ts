import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { combineAll } from 'rxjs';
import { Company } from '../models/company';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const users = [
      {
        id: 1,
        firstName: 'test',
        lastName: 'test',
        username: 'Test',
        email: 'test@mail.com',
        password: '1234',
      },
      {
        id: 2,
        firstName: 'Daniele',
        lastName: 'Tosco',
        username: 'DaniT',
        email: 'dan@email.com',
        password: '2332',
      },
    ];

    const companies = [
      {
        id: 1,
        name: 'New company',
        address: 'Address',
        phone: '333-333333',
        revenue: 1000,
      },

      {
        id: 2,
        name: 'Another Company',
        address: 'address',
        phone: '39 3342323',
        revenue: 2000,
      },
    ];

    return { users, companies };
  }

  genId(companies: Company[]): number {
    return companies.length > 0
      ? Math.max(...companies.map((company) => company.id)) + 1
      : 1;
  }
}
