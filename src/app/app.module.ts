import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { InMemoryDataService } from './services/in-memory-data.service';

import { AppComponent } from './app.component';
import { LoginFormComponent } from './login-component/login-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CompanyFormComponent } from './company-form/company-form.component';
import { HomepageComponent } from './homepage/homepage.component';
import { CompanyDetailsComponent } from './company-details/company-details.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    CompanyFormComponent,
    HomepageComponent,
    CompanyDetailsComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
      dataEncapsulation: false,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
