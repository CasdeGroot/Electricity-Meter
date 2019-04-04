import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginComponent} from './components/login.component';
import {AuthService} from './services/auth.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthGuardService} from './services/auth-guard.service';
import { CreateaccountComponent } from './components/createaccount/createaccount.component';
import { LoginoverlayComponent } from './components/loginoverlay/loginoverlay.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  declarations: [LoginComponent, CreateaccountComponent, LoginoverlayComponent],
  exports: [LoginComponent, CreateaccountComponent, LoginoverlayComponent],
  providers: [AuthService, AuthGuardService]
})
export class LoginModule { }
