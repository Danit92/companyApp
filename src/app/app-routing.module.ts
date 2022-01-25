import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponentComponent } from './login-component/login-component.component';

const routes: Routes = [
  {'path': '', redirectTo: 'login', pathMatch: 'full'},
  {'path': 'login', component: LoginComponentComponent},
  {'path': 'homepage', component: HomepageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
